import { memorizeFn } from '../perf/memorizeFn'
import { useRic } from '../perf/useRic'
import { createElement } from '../event/createElement'
import { insertElement } from '../event/insertElement'
import { removeElement } from '../event/removeElement'
import type { Direction, DotImageCanvasOptions, MaybeElement } from '../types'
import { useRaf } from '../perf'

/**
 * DotImageCanvas 将图片转换为点阵图形式展示，并提供动画绘制效果
 *
 * 支持多种绘制方向，颜色控制，背景设置，以及动画效果控制
 * @class
 */
export class DotImageCanvas {
  /** 用于绘制的 Canvas 元素 */
  canvas = document.createElement('canvas')

  /** Canvas 的绘制上下文 */
  ctx = this.canvas.getContext('2d')!

  /** 缓存已处理图像的点阵数据 */
  points: Map<string, Record<string, any>> = new Map()

  /** 原始图片源地址 */
  originSrc = ''

  /** 点阵图颜色，设置后将覆盖原图颜色 */
  color = ''

  /** 点阵粗细，影响绘制的圆点大小 */
  fontWeight = 1

  /** 绘制状态：pending-绘制中，success-完成，fail-失败，reverted-已撤销 */
  status = 'pending'

  /** 背景颜色 */
  bgColor?: string = '#fff'

  /** 停止当前动画的函数 */
  stop: () => void = () => {}

  /** 绘制方向 */
  direction: Direction = 'horizontal'

  /** 所有绘制任务 */
  allTasks: Function[] = []

  /** 已完成的任务索引 */
  completedTaskIndex = 0

  /** 是否正在撤销绘制 */
  isReverting = false

  /** 每个绘制任务中的点坐标记录 */
  drawnPoints: Array<{ x: number, y: number, color: any }[]> = []

  /** 清除任务列表 */
  clearTasks: Function[] = []

  /** 是否使用优先渲染模式 (RAF) */
  isPreferred = false

  /** 是否已挂载到DOM */
  mounted = false

  /**
   * 创建 DotImageCanvas 实例
   *
   * @param {string | DotImageCanvasOptions} srcOrOptions - 图片URL或选项对象
   * @param {string} [color] - 绘制颜色，为空时保留原图颜色
   * @param {number} [fontWeight] - 点阵粗细
   * @param {string} [bgColor] - 背景颜色
   * @param {Direction} [direction] - 绘制方向
   */
  constructor(
    srcOrOptions: string | DotImageCanvasOptions,
    color?: string,
    fontWeight?: number,
    bgColor: string = '#fff',
    direction?: Direction,
  ) {
    if (typeof srcOrOptions === 'string') {
      // 原始参数列表模式
      this.initOptions(srcOrOptions, color!, fontWeight!, bgColor, direction)
    }
    else {
      // 选项对象模式
      const options = srcOrOptions
      this.initOptions(
        options.src,
        options.color,
        options.fontWeight,
        options.bgColor || '#fff',
        options.direction,
      )

      // 设置其他选项
      if (options.isPreferred !== undefined) {
        this.isPreferred = options.isPreferred
      }
    }
    this.executor()
  }

  createDotImage(img: HTMLImageElement) {
    this.canvas.width = img.width * devicePixelRatio
    this.canvas.height = img.height * devicePixelRatio
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

    const width = this.canvas.width
    const height = this.canvas.height

    // 获取图像数据
    const imageDataObj = this.ctx.getImageData(0, 0, width, height)
    const rawData = imageDataObj.data

    // 使用 Uint32Array 提供更高效的像素访问
    // 这将把 RGBA 四个字节看作一个 32 位整数
    const pixelView = new Uint32Array(rawData.buffer)

    // 存储像素是否有效（非白色）的位图
    // 使用 Uint8Array 每个像素只占一个字节，0表示透明/白色，1表示有内容
    const pixelBitmap = new Uint8Array(width * height)

    // 存储实际颜色值，只存储非透明非白色的像素，节省内存
    const colorMap = new Map<number, string>()

    // 预分配二维数组，但使用稀疏存储方式
    const imagePointSet: (string | number | undefined)[][] = new Array(height)
    for (let i = 0; i < height; i++) {
      imagePointSet[i] = new Array(width)
    }

    // 白色像素的阈值（R、G、B 都大于230认为是白色）
    const WHITE_THRESHOLD = 230 * 65536 + 230 * 256 + 230

    // 处理每个像素
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const pixelIndex = i * width + j
        const pixelValue = pixelView[pixelIndex]

        // 提取 RGBA 值
        const r = (pixelValue >> 0) & 0xFF
        const g = (pixelValue >> 8) & 0xFF
        const b = (pixelValue >> 16) & 0xFF
        const a = (pixelValue >> 24) & 0xFF

        // 检查是否是白色或透明
        if (a === 0 || (r > 230 && g > 230 && b > 230)) {
          pixelBitmap[pixelIndex] = 0
          imagePointSet[i][j] = this.color ? 0 : this.bgColor
        }
        else {
          pixelBitmap[pixelIndex] = 1
          const color = `rgba(${r},${g},${b},${a / 255})`
          colorMap.set(pixelIndex, color)
          imagePointSet[i][j] = color
        }
      }
    }

    // 存储优化后的数据结构，便于后续访问
    this.points.set(this.originSrc, {
      width,
      height,
      imagePointSet,
      pixelBitmap, // 存储位图数据，方便快速查询像素是否有效
      colorMap, // 存储颜色映射，节约内存
    })

    return imagePointSet
  }

  createImage() {
    if (this.hasImage()) {
      const { imagePointSet, width, height } = this.points.get(
        this.originSrc,
      ) as Record<string, any>
      const pRatio = window.devicePixelRatio || 1
      this.canvas.width = width * pRatio
      this.canvas.height = height * pRatio
      this.getCanvas(imagePointSet)
      return
    }
    const img = createElement('img', {
      crossOrigin: 'anonymous',
      src: this.originSrc,
    })
    return new Promise((resolve) => {
      img.onload = () => {
        this.getCanvas(this.createDotImage(img))
        resolve(img)
      }
      img.onerror = () => {
        this.status = 'fail'
        // reject(new Error('create image error'))
      }
    })
  }

  hasImage() {
    return this.points.has(this.originSrc)
  }

  async executor() {
    try {
      await this.createImage()
    }
    catch (error) {}
    return this
  }

  /**
   * 创建绘制和清除任务的辅助方法 - 保持原有实现方式
   */
  createDrawAndClearTasks(
    pointsGenerator: () => { x: number, y: number, color: any }[],
    size: number,
  ) {
    const batchPoints: { x: number, y: number, color: any }[] = []

    // 创建绘制任务
    const drawTask = () => {
      const points = pointsGenerator()
      for (const { x, y, color } of points) {
        batchPoints.push({ x, y, color })
        this.ctx.beginPath()
        this.ctx.arc(x, y, size, 0, Math.PI * 2)
        this.ctx.fillStyle = color
        this.ctx.fill()
      }
    }

    // 创建对应的清除任务 - 保持原有实现
    const clearTask = () => {
      for (const { x, y, color } of batchPoints) {
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.clearRect(x - size, y - size, size * 2.5, size * 2.5)
      }
    }

    return { drawTask, clearTask }
  }

  getCanvas(imagePointSet: (string | number | undefined)[][]) {
    this.clearCanvas()
    const h = imagePointSet.length
    const w = imagePointSet[0]?.length
    const oneTempLength = (this.canvas.width * 1) / h
    const size = (this.fontWeight * 50) / this.canvas.width
    const getPoint = memorizeFn((i: number) => oneTempLength * (i + 0.5))
    const tasks: Function[] = []
    const clearTasks: Function[] = []

    if (this.direction === 'horizontal-reverse') {
      for (let i = h - 1; i >= 0; i--) {
        const row = i
        const { drawTask, clearTask } = this.createDrawAndClearTasks(() => {
          // 预分配一个合理大小的数组
          const points = new Array(w) // 最多w个点
          let pointCount = 0

          for (let j = w - 1; j >= 0; j--) {
            const color = imagePointSet[row][j]
            if (color) {
              points[pointCount++] = {
                x: getPoint(j),
                y: getPoint(row),
                color: this.color || `${color}`,
              }
            }
          }

          // 只返回实际使用的部分
          return pointCount < w ? points.slice(0, pointCount) : points
        }, size)

        tasks.push(drawTask)
        clearTasks.push(clearTask)
      }
    }
    else if (this.direction === 'horizontal') {
      for (let i = 0; i < h; i++) {
        const row = i // 捕获当前行索引
        const { drawTask, clearTask } = this.createDrawAndClearTasks(() => {
          const points = []
          for (let j = 0; j < w; j++) {
            const color = imagePointSet[row][j]
            if (color) {
              points.push({
                x: getPoint(j),
                y: getPoint(row),
                color: this.color || `${color}`,
              })
            }
          }
          return points
        }, size)

        tasks.push(drawTask)
        clearTasks.push(clearTask)
      }
    }
    else if (this.direction === 'vertical') {
      for (let j = 0; j < w; j++) {
        const col = j // 捕获当前列索引
        const { drawTask, clearTask } = this.createDrawAndClearTasks(() => {
          const points = []
          for (let i = 0; i < h; i++) {
            const color = imagePointSet[i][col]
            if (color) {
              points.push({
                x: getPoint(col),
                y: getPoint(i),
                color: this.color || `${color}`,
              })
            }
          }
          return points
        }, size)

        tasks.push(drawTask)
        clearTasks.push(clearTask)
      }
    }
    else if (this.direction === 'vertical-reverse') {
      for (let j = w - 1; j >= 0; j--) {
        const col = j // 捕获当前列索引
        const { drawTask, clearTask } = this.createDrawAndClearTasks(() => {
          const points = []
          for (let i = h - 1; i >= 0; i--) {
            const color = imagePointSet[i][col]
            if (color) {
              points.push({
                x: getPoint(col),
                y: getPoint(i),
                color: this.color || `${color}`,
              })
            }
          }
          return points
        }, size)

        tasks.push(drawTask)
        clearTasks.push(clearTask)
      }
    }
    else if (
      this.direction === 'center-out'
      || this.direction === 'out-center'
    ) {
      const centerX = Math.floor(w / 2)
      const centerY = Math.floor(h / 2)

      // 从缓存中获取位图和颜色映射
      const { pixelBitmap, colorMap } = this.points.get(this.originSrc) || {}

      // 估计有效点的数量
      const validPixels = pixelBitmap
        ? Array.from(pixelBitmap).filter(p => p === 1).length
        : Math.ceil(w * h * 0.3)

      // 使用 Float32Array 存储距离计算，更高效
      let distances = new Float32Array(validPixels)

      // 创建点数据结构
      const pointData = {
        indices: new Uint32Array(validPixels), // 存储像素索引
        x: new Uint16Array(validPixels), // x坐标
        y: new Uint16Array(validPixels), // y坐标
      }

      // 收集所有有效点
      let pointCount = 0
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          const pixelIndex = i * w + j

          // 如果有位图数据，使用它快速判断
          if (pixelBitmap && pixelBitmap[pixelIndex] === 0)
            continue

          // 否则使用原始数据判断
          const color = imagePointSet[i][j]
          if (!color)
            continue

          // 记录这个点
          pointData.indices[pointCount] = pixelIndex
          pointData.x[pointCount] = j
          pointData.y[pointCount] = i

          // 计算距离
          distances[pointCount] = Math.sqrt(
            (j - centerX) ** 2 + (i - centerY) ** 2,
          )
          pointCount++
        }
      }

      // 如果实际点数少于预估值，调整数组大小
      if (pointCount < validPixels) {
        const newIndices = new Uint32Array(pointCount)
        const newX = new Uint16Array(pointCount)
        const newY = new Uint16Array(pointCount)
        const newDistances = new Float32Array(pointCount)

        for (let i = 0; i < pointCount; i++) {
          newIndices[i] = pointData.indices[i]
          newX[i] = pointData.x[i]
          newY[i] = pointData.y[i]
          newDistances[i] = distances[i]
        }

        pointData.indices = newIndices
        pointData.x = newX
        pointData.y = newY
        distances = newDistances
      }

      // 创建索引排序数组
      const indexOrder = new Uint32Array(pointCount)
      for (let i = 0; i < pointCount; i++) indexOrder[i] = i

      // 根据距离排序索引
      if (this.direction === 'center-out') {
        indexOrder.sort((a, b) => distances[a] - distances[b])
      }
      else {
        indexOrder.sort((a, b) => distances[b] - distances[a])
      }

      // 计算批处理大小，确保任务数量适中
      const batchSize = Math.max(
        1,
        Math.min(
          500, // 上限
          Math.floor(pointCount / 100), // 默认批量
        ),
      )

      // 批量创建绘制任务
      for (let i = 0; i < pointCount; i += batchSize) {
        const end = Math.min(i + batchSize, pointCount)
        const { drawTask, clearTask } = this.createDrawAndClearTasks(() => {
          const result = []
          for (let j = i; j < end; j++) {
            const pointIndex = indexOrder[j]
            const x = getPoint(pointData.x[pointIndex])
            const y = getPoint(pointData.y[pointIndex])
            const pixelIndex = pointData.indices[pointIndex]
            const color = colorMap
              ? colorMap.get(pixelIndex) || this.color
              : this.color
                || imagePointSet[pointData.y[pointIndex]][pointData.x[pointIndex]]

            result.push({ x, y, color })
          }
          return result
        }, size)

        tasks.push(drawTask)
        clearTasks.push(clearTask)
      }
    }

    this.allTasks = tasks
    this.clearTasks = clearTasks
    this.completedTaskIndex = 0
    this.isReverting = false

    this.startAnimation()
  }

  startAnimation() {
    this.stop()

    // 使用Array.from来创建任务数组，减少闭包
    const tasksToRun = this.isReverting
      ? Array.from({ length: this.completedTaskIndex }, (_, i) => {
          const idx = this.completedTaskIndex - 1 - i
          return () => {
            const clearTask = this.clearTasks[idx]
            if (clearTask) {
              clearTask()
              this.completedTaskIndex = idx
            }
            return true
          }
        }).filter(task => task !== null)
      : Array.from(
          { length: this.allTasks.length - this.completedTaskIndex },
          (_, i) => {
            const idx = this.completedTaskIndex + i
            return () => {
              const drawTask = this.allTasks[idx]
              if (drawTask) {
                drawTask()
                this.completedTaskIndex = idx + 1
              }
              return true
            }
          },
        )

    if (this.isPreferred) {
      let currentIndex = 0
      this.stop = useRaf(() => {
        // 处理几个任务
        const tasksPerFrame = 5
        let count = 0

        while (currentIndex < tasksToRun.length && count < tasksPerFrame) {
          tasksToRun[currentIndex]()
          currentIndex++
          count++
        }

        if (currentIndex >= tasksToRun.length) {
          // 所有任务完成
          this.stop()
          this.status = this.isReverting ? 'reverted' : 'success'

          if (this.isReverting) {
            this.completedTaskIndex = 0
          }
          else {
            this.completedTaskIndex = this.allTasks.length
          }
        }
      })
    }
    else {
      this.stop = useRic(tasksToRun, {
        callback: () => {
          this.status = this.isReverting ? 'reverted' : 'success'

          if (this.isReverting) {
            this.completedTaskIndex = 0
          }
          else {
            this.completedTaskIndex = this.allTasks.length
          }
          this.stop()
        },
      })
    }

    return this
  }

  revert() {
    if (this.completedTaskIndex <= 0)
      return this

    this.isReverting = true
    this.startAnimation()
    return this
  }

  continue() {
    if (this.completedTaskIndex >= this.allTasks.length && !this.isReverting) {
      return this
    }

    this.isReverting = false
    this.startAnimation()
    return this
  }

  initOptions(
    src: string,
    color: string,
    fontWeight: number,
    bgColor: string,
    direction: Direction = 'horizontal',
  ) {
    this.originSrc = src
    this.color = color
    this.fontWeight = fontWeight
    this.bgColor = bgColor
    this.direction = direction
  }

  /**
   * 重新绘制图像，可以更新配置
   *
   * @param {string | Partial<DotImageCanvasOptions>} srcOrOptions - 图片URL或选项对象
   * @param {string} [color] - 点阵颜色
   * @param {number} [fontWeight] - 点阵粗细
   * @param {string} [bgColor] - 背景颜色
   * @param {Direction} [direction] - 绘制方向
   * @returns {Promise<DotImageCanvas>} 更新后的实例
   */
  async repaint(
    srcOrOptions: string | Partial<DotImageCanvasOptions>,
    color?: string,
    fontWeight?: number,
    bgColor: string = '#fff',
    direction?: Direction,
  ) {
    this.stop()
    const p = removeElement(this.canvas)
    this.status = 'pending'

    if (typeof srcOrOptions === 'string') {
      // 原始参数列表模式
      this.initOptions(srcOrOptions, color!, fontWeight!, bgColor, direction)
    }
    else {
      // 选项对象模式
      const options = srcOrOptions
      this.initOptions(
        options.src || this.originSrc,
        options.color || this.color,
        options.fontWeight !== undefined ? options.fontWeight : this.fontWeight,
        options.bgColor || this.bgColor || '#fff',
        options.direction || this.direction,
      )

      // 更新其他选项
      if (options.isPreferred !== undefined) {
        this.isPreferred = options.isPreferred
      }
    }

    if (!p) {
      throw new Error(
        'repaint error not found canvas container or has been removed',
      )
    }

    return Object.assign(
      this,
      (await this.executor()) as DotImageCanvas,
    ).append(p as HTMLElement)
  }

  clearCanvas() {
    this.stop()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.completedTaskIndex = 0
    this.isReverting = false
  }

  append(container: MaybeElement) {
    insertElement(container, this.canvas)
    this.mounted = true
    return this
  }

  destory() {
    this.stop()
    this.mounted = false
    removeElement(this.canvas)
  }
}

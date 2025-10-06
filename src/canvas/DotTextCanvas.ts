import { memorizeFn } from '../perf/memorizeFn'
import { useRic } from '../perf/useRic'
import { insertElement } from '../event/insertElement'
import { removeElement } from '../event/removeElement'
import type { Direction, DotTextCanvasOptions, MaybeElement } from '../types'
import { useRaf } from '../perf/useRaf'

/**
 * DotTextCanvas 将文字转换为点阵形式展示，并提供动画绘制效果
 *
 * 支持多种绘制方向、颜色控制、间距设置以及动画效果
 * @class
 * @description EN: Convert text into a dot-matrix representation and animate the drawing with configurable direction, color and spacing options.
 */
export class DotTextCanvas {
  /** 用于绘制的 Canvas 元素 */
  canvas = document.createElement('canvas')

  /** Canvas 的绘制上下文 */
  ctx = this.canvas.getContext('2d')!

  /** 缓存已处理字符的点阵数据 */
  points: Map<string, Array<number[]>> = new Map()

  /** 原始文本内容 */
  originText: string

  /** 字体大小 */
  fontSize: number

  /** 点阵颜色 */
  color: string

  /** 点阵粗细，影响绘制的圆点大小 */
  fontWeight: number

  /** 绘制方向 */
  direction: Direction

  /** 全局字符间距，默认为0 */
  charSpacing: number = 0

  /** 每个字符对之间的间距数组，优先级高于全局间距 */
  charSpacings: number[] = []

  /** 存储最终合成的点阵数据 */
  textPointSet: Array<number[]> = []

  /** 绘制状态：pending-绘制中，success-完成 */
  status = 'pending'

  /** 容器元素 */
  container?: HTMLElement

  /** 停止当前动画的函数 */
  stop: () => void = () => {}

  /** 是否已挂载到DOM */
  mounted = false

  /** 是否使用优先渲染模式(RAF) */
  isPreferred = false

  /** 用于文本绘制的临时Canvas元素 */
  private _textCanvas?: HTMLCanvasElement

  /** 临时Canvas的绘制上下文 */
  private _textCtx?: CanvasRenderingContext2D

  /**
   * 创建 DotTextCanvas 实例
   *
   * @param {string | DotTextCanvasOptions} textOrOptions - 文本内容或选项对象
   * @param {number} [fontSize] - 字体大小
   * @param {string} [color] - 点阵颜色
   * @param {number} [fontWeight] - 点阵粗细
   * @param {Direction} [direction] - 绘制方向
   * @param {boolean} [isPreferred] - 是否使用优先渲染模式
   * @param {number} [charSpacing] - 全局字符间距
   * @param {number[]} [charSpacings] - 每个字符对之间的间距数组
   */
  constructor(
    textOrOptions: string | DotTextCanvasOptions,
    fontSize?: number,
    color?: string,
    fontWeight?: number,
    direction: Direction = 'vertical',
    isPreferred = false,
    charSpacing = 0,
    charSpacings: number[] = [],
  ) {
    if (typeof textOrOptions === 'string') {
      // 原始参数列表模式
      this.originText = textOrOptions
      this.fontSize = fontSize!
      this.color = color!
      this.fontWeight = fontWeight!
      this.direction = direction
      this.isPreferred = isPreferred
      this.charSpacing = Math.max(0, charSpacing) // 确保不为负
      this.charSpacings = charSpacings.map(s => Math.max(0, s)) // 确保所有间距不为负
    }
    else {
      // 选项对象模式
      const options = textOrOptions
      this.originText = options.text
      this.fontSize = options.fontSize
      this.color = options.color
      this.fontWeight = options.fontWeight
      this.direction = options.direction || 'vertical'
      this.isPreferred = options.isPreferred || false
      this.charSpacing
        = options.charSpacing !== undefined ? Math.max(0, options.charSpacing) : 0 // 确保不为负
      this.charSpacings = options.charSpacings
        ? options.charSpacings.map(s => Math.max(0, s))
        : [] // 确保所有间距不为负
    }
    this.executor()
  }

  /**
   * 为单个字符创建点阵数据
   *
   * @param {string} text - 要转换为点阵的字符
   * @returns {Array<number[]>} 字符的点阵数据
   */
  createTextPoint(text: string) {
    // Cache the canvas and context instead of creating new ones each time
    if (!this._textCanvas) {
      this._textCanvas = document.createElement('canvas')
      this._textCtx = this._textCanvas.getContext('2d')!
    }
    const canvas = this._textCanvas
    const ctx = this._textCtx!
    const pRatio = window.devicePixelRatio || 1
    const size = 16 * pRatio
    canvas.width = canvas.height = size
    ctx.font = `${size}px SimSun`
    ctx.fillText(text, 0, 14 * pRatio)
    const {
      data: imageData,
      width,
      height,
    } = ctx.getImageData(0, 0, size, size)
    const textPointSet = []
    for (let i = 0; i < height; i++) {
      const temp: number[] = []
      textPointSet.push(temp)
      for (let j = 0; j < width; j++) {
        const pxStartIndex = i * width * 4 + j * 4
        temp.push(imageData[pxStartIndex + 3] ? 1 : 0)
      }
    }
    this.points.set(text, textPointSet)
    return textPointSet
  }

  /**
   * 执行文字点阵转换流程
   */
  executor() {
    this.originText.split('').forEach(text => this.getText(text))
    this.textPointSet = this.combineText()
    this.getCanvas()
  }

  /**
   * 获取字符的点阵数据，如果不存在则创建
   *
   * @param {string} text - 要获取点阵数据的字符
   * @returns {Array<number[]>|undefined} 字符的点阵数据
   */
  getText(text: string) {
    return this.points.has(text)
      ? this.points.get(text)
      : this.createTextPoint(text)
  }

  /**
   * 合并所有字符的点阵数据，并应用字符间距
   *
   * @returns {Array<number[]>} 合并后的点阵数据
   */
  combineText() {
    const result: Array<number[]> = [[]]
    const len = this.originText.length

    for (let i = 0; i < len; i++) {
      // 添加当前字符的点阵
      const charPoints = this.points.get(this.originText[i]) || []
      charPoints.forEach((item, index) => {
        result[index] = (result[index] || []).concat(item)
      })

      // 如果不是最后一个字符，添加特定间距
      if (i < len - 1) {
        // 获取当前字符对的间距，优先使用特定间距，否则使用全局间距
        const currentSpacing
          = i < this.charSpacings.length ? this.charSpacings[i] : this.charSpacing

        // 添加空白列作为间距（必须 >= 0）
        if (currentSpacing > 0) {
          const charHeight = charPoints.length
          for (let row = 0; row < charHeight; row++) {
            // 确保结果数组有足够的行
            if (!result[row])
              result[row] = []

            // 添加空白列作为间距
            for (let space = 0; space < currentSpacing; space++) {
              result[row].push(0)
            }
          }
        }
        // 不考虑间距为负的情况，因为要求最小值为0
      }
    }
    return result
  }

  /**
   * 根据绘制方向生成点坐标数组
   *
   * @param {number} h - 点阵高度
   * @param {number} w - 点阵宽度
   * @returns {Array<[number, number]>} 按指定方向排列的点坐标数组
   */
  getPointsForDirection(h: number, w: number): Array<[number, number]> {
    const pointsToDraw: Array<[number, number]> = []

    const strategies = {
      'horizontal': () => {
        for (let i = 0; i < h; i++) {
          for (let j = 0; j < w; j++) {
            pointsToDraw.push([i, j])
          }
        }
      },
      'horizontal-reverse': () => {
        for (let i = 0; i < h; i++) {
          for (let j = w - 1; j >= 0; j--) {
            pointsToDraw.push([i, j])
          }
        }
      },
      'vertical': () => {
        for (let j = 0; j < w; j++) {
          for (let i = 0; i < h; i++) {
            pointsToDraw.push([i, j])
          }
        }
      },
      'vertical-reverse': () => {
        for (let j = 0; j < w; j++) {
          for (let i = h - 1; i >= 0; i--) {
            pointsToDraw.push([i, j])
          }
        }
      },
      'center-out': () => {
        const centerI = Math.floor(h / 2)
        const centerJ = Math.floor(w / 2)
        const points: [number, number, number][] = []

        for (let i = 0; i < h; i++) {
          for (let j = 0; j < w; j++) {
            const distance = Math.sqrt((i - centerI) ** 2 + (j - centerJ) ** 2)
            points.push([i, j, distance])
          }
        }

        points.sort((a, b) => a[2] - b[2])
        points.forEach(([i, j]) => pointsToDraw.push([i, j]))
      },
      'out-center': () => {
        const centerI = Math.floor(h / 2)
        const centerJ = Math.floor(w / 2)
        const points: [number, number, number][] = []

        for (let i = 0; i < h; i++) {
          for (let j = 0; j < w; j++) {
            const distance = Math.sqrt((i - centerI) ** 2 + (j - centerJ) ** 2)
            points.push([i, j, distance])
          }
        }

        points.sort((a, b) => b[2] - a[2])
        points.forEach(([i, j]) => pointsToDraw.push([i, j]))
      },
    }

    strategies[this.direction]()
    return pointsToDraw
  }

  /**
   * 设置Canvas大小并准备绘制
   */
  getCanvas() {
    const h = this.textPointSet.length
    const w = this.textPointSet[0].length
    const oneTempLength = this.fontSize / h
    const getPoint = memorizeFn((i: number) => oneTempLength * (i + 0.5))
    const size = (oneTempLength * this.fontWeight) / h

    this.canvas.height = this.fontSize

    // 使用 textPointSet 的实际宽度（已经包含了字符间距）
    this.canvas.width = w * oneTempLength

    const batchSize = 50
    const pointsToDraw = this.getPointsForDirection(h, w)
    const tasks = this.createDrawTasks(pointsToDraw, batchSize, getPoint, size)

    this.startDrawing(tasks)
  }

  /**
   * 创建分批绘制任务
   *
   * @param {Array<[number, number]>} pointsToDraw - 要绘制的点坐标数组
   * @param {number} batchSize - 每批绘制的点数量
   * @param {Function} getPoint - 点坐标计算函数
   * @param {number} size - 点的大小
   * @returns {Array<Function>} 绘制任务数组
   */
  createDrawTasks(
    pointsToDraw: Array<[number, number]>,
    batchSize: number,
    getPoint: Function,
    size: number,
  ) {
    const tasks: Array<Function> = []

    for (let i = 0; i < pointsToDraw.length; i += batchSize) {
      const batch = pointsToDraw.slice(i, i + batchSize)
      tasks.push(this.createBatchDrawTask(batch, getPoint, size))
    }

    return tasks
  }

  /**
   * 创建一批点的绘制任务
   *
   * @param {Array<[number, number]>} points - 一批要绘制的点坐标
   * @param {Function} getPoint - 点坐标计算函数
   * @param {number} size - 点的大小
   * @returns {Function} 绘制任务函数
   */
  createBatchDrawTask(
    points: Array<[number, number]>,
    getPoint: Function,
    size: number,
  ) {
    return () => {
      this.ctx.beginPath()
      points.forEach(([i, j]) => {
        if (this.textPointSet[i][j]) {
          this.ctx.moveTo(getPoint(j) + size, getPoint(i))
          this.ctx.arc(getPoint(j), getPoint(i), size, 0, Math.PI * 2)
        }
      })
      this.ctx.fillStyle = this.color
      this.ctx.fill()
    }
  }

  /**
   * 开始执行动画绘制
   *
   * @param {Array<Function>} tasks - 绘制任务数组
   */
  startDrawing(tasks: Array<Function>) {
    if (this.isPreferred) {
      this.stop = useRaf(() => {
        const task = tasks.shift()
        if (task) {
          task()
        }
        if (tasks.length === 0) {
          this.status = 'success'
          this.stop()
        }
      })
    }
    else {
      this.stop = useRic(tasks, {
        callback: () => (this.status = 'success'),
      })
    }
  }

  /**
   * 重新绘制文字，可以更新配置
   *
   * @param {string | Partial<DotTextCanvasOptions>} textOrOptions - 文本内容或选项对象
   * @param {number} [fontSize] - 字体大小
   * @param {string} [color] - 点阵颜色
   * @param {number} [fontWeight] - 点阵粗细
   * @param {Direction} [direction] - 绘制方向
   * @returns {DotTextCanvas} 当前实例
   */
  repaint(
    this: any,
    textOrOptions: string | Partial<DotTextCanvasOptions>,
    fontSize?: number,
    color?: string,
    fontWeight?: number,
    direction?: Direction,
  ): DotTextCanvas {
    this.stop()
    const p = removeElement(this.canvas)
    if (!p) {
      throw new Error(
        'repaint error not found canvas container or has been removed',
      )
    }
    this.status = 'pending'

    let text: string
    let updatedDirection: Direction | undefined

    if (typeof textOrOptions === 'string') {
      // 原始参数列表模式
      text = textOrOptions
      updatedDirection = direction
    }
    else {
      // 选项对象模式
      text = textOrOptions.text || this.originText
      fontSize = textOrOptions.fontSize || this.fontSize
      color = textOrOptions.color || this.color
      fontWeight = textOrOptions.fontWeight || this.fontWeight
      updatedDirection = textOrOptions.direction

      // 更新字符间距，确保不为负
      this.charSpacing
        = textOrOptions.charSpacing !== undefined
          ? Math.max(0, textOrOptions.charSpacing)
          : this.charSpacing

      // 更新特定字符间距，确保不为负
      this.charSpacings = textOrOptions.charSpacings
        ? textOrOptions.charSpacings.map(s => Math.max(0, s))
        : this.charSpacings
    }

    // 如果文本或方向变化，则需要重新创建
    if (
      this.originText !== text
      || (updatedDirection && this.direction !== updatedDirection)
    ) {
      const newInstance
        = typeof textOrOptions === 'string'
          ? new DotTextCanvas(
            text,
            fontSize!,
            color!,
            fontWeight!,
            updatedDirection || this.direction,
            this.isPreferred,
          )
          : new DotTextCanvas({
            text,
            fontSize: fontSize!,
            color: color!,
            fontWeight: fontWeight!,
            direction: updatedDirection || this.direction,
            isPreferred: this.isPreferred,
          })

      return Object.assign(this, newInstance).append(p)
    }

    this.fontSize = fontSize!
    this.color = color!
    this.fontWeight = fontWeight!
    if (updatedDirection)
      this.direction = updatedDirection
    this.clearCanvas()
    this.getCanvas()
    return this.append(p)
  }

  /**
   * 清除Canvas上的内容
   */
  clearCanvas() {
    this.stop()
    this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
  }

  /**
   * 将Canvas元素添加到DOM容器中
   *
   * @param {MaybeElement} container - 要插入的容器元素
   * @returns {DotTextCanvas} 当前实例
   */
  append(container: MaybeElement) {
    insertElement(container, this.canvas)
    this.mounted = true
    return this
  }

  /**
   * 销毁实例，移除DOM元素并停止所有动画
   */
  destory() {
    this.stop()
    this.mounted = false
    removeElement(this.canvas)
  }
}

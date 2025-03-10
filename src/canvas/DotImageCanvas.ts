import { memorizeFn } from '../perf/memorizeFn'
import { useRic } from '../perf/useRic'
import { createElement } from '../event/createElement'
import { insertElement } from '../event/insertElement'
import { removeElement } from '../event/removeElement'
import type { Direction, MaybeElement } from '../types'

export class DotImageCanvas {
  canvas = document.createElement('canvas')
  ctx = this.canvas.getContext('2d')!
  points: Map<string, Record<string, any>> = new Map()
  originSrc = ''
  color = ''
  fontWeight = 1
  status = 'pending'
  bgColor?: string
  stop: () => void = () => {}
  direction: Direction = 'horizontal'
  constructor(
    src: string,
    color: string,
    fontWeight: number,
    bgColor = '#fff',
    direction?: Direction,
  ) {
    this.initOptions(src, color, fontWeight, bgColor, direction)
    this.executor()
  }

  createDotImage(img: HTMLImageElement) {
    this.canvas.width = img.width * devicePixelRatio
    this.canvas.height = img.height * devicePixelRatio
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    const {
      data: imageData,
      width,
      height,
    } = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    const imagePointSet: number[][] = []
    for (let i = 0; i < height; i++) {
      const temp: any[] = []
      imagePointSet.push(temp)
      for (let j = 0; j < width; j++) {
        const pxStartIndex = i * width * 4 + j * 4
        const pxData = {
          r: imageData[pxStartIndex],
          g: imageData[pxStartIndex + 1],
          b: imageData[pxStartIndex + 2],
          a: imageData[pxStartIndex + 3],
        }
        const color = `rgba(${pxData.r},${pxData.g},${pxData.b},${pxData.a})`
        if (pxData.r > 230 && pxData.g > 230 && pxData.b > 230)
          temp.push(this.color ? 0 : this.bgColor)
        else temp.push(pxData.a ? color : 0)
      }
    }

    this.points.set(this.originSrc, {
      width: this.canvas.width,
      imagePointSet,
      height: this.canvas.height,
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
      this.createImage()
    }
    catch (error) {}
    return this
  }

  getCanvas(imagePointSet: Array<number[]>) {
    this.clearCanvas()
    const h = imagePointSet.length
    const w = imagePointSet[0]?.length
    const oneTempLength = (this.canvas.width * 1) / h
    const size = (this.fontWeight * 50) / this.canvas.width
    const getPoint = memorizeFn((i: number) => oneTempLength * (i + 0.5))
    const tasks: Function[] = []

    if (this.direction === 'horizontal-reverse') {
      for (let i = h - 1; i >= 0; i--) {
        tasks.push(() => {
          for (let j = w - 1; j >= 0; j--) {
            const color = imagePointSet[i][j]
            if (color) {
              this.ctx.beginPath()
              this.ctx.arc(getPoint(j), getPoint(i), size, 0, Math.PI * 2)
              this.ctx.fillStyle = this.color || `${color}`
              this.ctx.fill()
            }
          }
        })
      }
    }
    else if (this.direction === 'horizontal') {
      for (let i = 0; i < h; i++) {
        tasks.push(() => {
          for (let j = 0; j < w; j++) {
            const color = imagePointSet[i][j]
            if (color) {
              this.ctx.beginPath()
              this.ctx.arc(getPoint(j), getPoint(i), size, 0, Math.PI * 2)
              this.ctx.fillStyle = this.color || `${color}`
              this.ctx.fill()
            }
          }
        })
      }
    }
    else if (this.direction === 'vertical') {
      for (let j = 0; j < w; j++) {
        tasks.push(() => {
          for (let i = 0; i < h; i++) {
            const color = imagePointSet[i][j]
            if (color) {
              this.ctx.beginPath()
              this.ctx.arc(getPoint(j), getPoint(i), size, 0, Math.PI * 2)
              this.ctx.fillStyle = this.color || `${color}`
              this.ctx.fill()
            }
          }
        })
      }
    }
    else if (this.direction === 'vertical-reverse') {
      for (let j = w - 1; j >= 0; j--) {
        tasks.push(() => {
          for (let i = h - 1; i >= 0; i--) {
            const color = imagePointSet[i][j]
            if (color) {
              this.ctx.beginPath()
              this.ctx.arc(getPoint(j), getPoint(i), size, 0, Math.PI * 2)
              this.ctx.fillStyle = this.color || `${color}`
              this.ctx.fill()
            }
          }
        })
      }
    }
    else if (
      this.direction === 'center-out'
      || this.direction === 'out-center'
    ) {
      // Calculate center point
      const centerX = Math.floor(w / 2)
      const centerY = Math.floor(h / 2)

      // Create an array of all points with their distances from center
      const pointsWithDistance: {
        x: number
        y: number
        color: any
        distance: number
      }[] = []

      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          const color = imagePointSet[i][j]
          if (color) {
            // Calculate Euclidean distance from center
            const distance = Math.sqrt((j - centerX) ** 2 + (i - centerY) ** 2)
            pointsWithDistance.push({ x: j, y: i, color, distance })
          }
        }
      }

      // Sort based on direction
      if (this.direction === 'center-out') {
        pointsWithDistance.sort((a, b) => a.distance - b.distance) // Ascending order
      }
      else {
        // out-center
        pointsWithDistance.sort((a, b) => b.distance - a.distance) // Descending order
      }

      // Group points by similar distance for better batching
      const batchSize = Math.max(1, Math.floor(pointsWithDistance.length / 100))

      for (let i = 0; i < pointsWithDistance.length; i += batchSize) {
        const batch = pointsWithDistance.slice(i, i + batchSize)

        tasks.push(() => {
          for (const point of batch) {
            this.ctx.beginPath()
            this.ctx.arc(
              getPoint(point.x),
              getPoint(point.y),
              size,
              0,
              Math.PI * 2,
            )
            this.ctx.fillStyle = this.color || `${point.color}`
            this.ctx.fill()
          }
        })
      }
    }

    this.stop = useRic(tasks, {
      callback: () => {
        this.status = 'success'
      },
    })
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

  async repaint(
    src: string,
    color: string,
    fontWeight: number,
    bgColor = '#fff',
    direction?: Direction,
  ) {
    this.stop()
    const p = removeElement(this.canvas)
    this.status = 'pending'
    this.initOptions(src, color, fontWeight, bgColor, direction)
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
  }

  append(container: MaybeElement) {
    insertElement(container, this.canvas)
    return this
  }

  destory() {
    this.stop()
    removeElement(this.canvas)
  }
}

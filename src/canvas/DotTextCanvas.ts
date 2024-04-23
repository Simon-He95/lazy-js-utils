import { memorizeFn } from '../perf/memorizeFn'
import { useRic } from '../perf/useRic'
import { insertElement } from '../event/insertElement'
import { removeElement } from '../event/removeElement'
import type { MaybeElement } from '../types'

export class DotTextCanvas {
  canvas = document.createElement('canvas')
  ctx = this.canvas.getContext('2d')!
  points: Map<string, Array<number[]>> = new Map()
  originText: string
  fontSize: number
  color: string
  fontWeight: number
  textPointSet: Array<number[]> = []
  status = 'pending'
  container?: HTMLElement
  stop: () => void = () => {}

  constructor(
    text: string,
    fontSize: number,
    color: string,
    fontWeight: number,
  ) {
    this.originText = text
    this.fontSize = fontSize
    this.color = color
    this.fontWeight = fontWeight
    this.executor()
  }

  createTextPoint(text: string) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
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

  executor() {
    this.originText.split('').forEach(text => this.getText(text))
    this.textPointSet = this.combineText()
    this.getCanvas()
  }

  getText(text: string) {
    return this.points.has(text)
      ? this.points.get(text)
      : this.createTextPoint(text)
  }

  combineText() {
    const result: Array<number[]> = [[]]
    const len = this.originText.length

    for (let i = 0; i < len; i++) {
      ;(this.points.get(this.originText[i]) || []).forEach((item, index) => {
        result[index] = (result[index] || []).concat(item)
      })
    }
    return result
  }

  getCanvas() {
    const h = this.textPointSet.length
    const w = this.textPointSet[0].length
    const oneTempLength = this.fontSize / h
    const tasks: Function[] = []
    const getPoint = memorizeFn((i: number) => oneTempLength * (i + 0.5))
    const size = (oneTempLength * this.fontWeight) / h
    this.canvas.height = this.fontSize
    this.canvas.width = this.fontSize * this.originText.length

    for (let i = 0; i < h; i++) {
      tasks.push(() => {
        for (let j = 0; j < w; j++) {
          if (this.textPointSet[i][j]) {
            this.ctx.beginPath()
            this.ctx.arc(getPoint(j), getPoint(i), size, 0, Math.PI * 2)
            this.ctx.fillStyle = this.color
            this.ctx.fill()
          }
        }
      })
    }
    this.stop = useRic(tasks, {
      callback: () => (this.status = 'success'),
    })
  }

  repaint(
    this: any,
    text: string,
    fontSize: number,
    color: string,
    fontWeight: number,
  ): DotTextCanvas {
    this.stop()
    const p = removeElement(this.canvas)
    if (!p) {
      throw new Error(
        'repaint error not found canvas container or has been removed',
      )
    }
    this.status = 'pending'
    // 如果text相同
    if (this.originText !== text) {
      return Object.assign(
        this,
        new DotTextCanvas(text, fontSize, color, fontWeight) as DotTextCanvas,
      ).append(p)
    }

    this.fontSize = fontSize
    this.color = color
    this.fontWeight = fontWeight
    this.clearCanvas()
    this.getCanvas()
    return this.append(p)
  }

  clearCanvas() {
    this.stop()
    this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
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

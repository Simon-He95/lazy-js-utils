import type { ISignature, MaybeElement } from '../types'
import { insertElement } from '../event/insertElement'
import { removeElement } from '../event/removeElement'
import { useEventListener } from '../event/useEventListener'
import { useKeyBoard } from '../event/useKeyBoard'

export class CreateSignatureCanvas implements ISignature {
  canvas: HTMLCanvasElement = document.createElement('canvas')
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!
  stop: (() => void)[] = []
  active = false
  historyStack: ImageData[] = []
  resetStack: ImageData[] = []
  color = '#000000'
  bg = '#eee'
  constructor(lineWidth = 2, w = 400, h = 400, color = '#000000', bg = '#eee') {
    this.color = color
    this.bg = bg
    this.createCanvas(lineWidth, w, h)
    window.onunload = () => this.unmount()
  }

  createCanvas(lineWidth = 2, w = 400, h = 400) {
    this.canvas.width = w * devicePixelRatio
    this.canvas.height = h * devicePixelRatio
    this.ctx.fillStyle = this.bg
    this.ctx.fillRect(0, 0, w, h)
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = lineWidth
    this.ctx.lineCap = 'round'
    let offsetY = 0
    let offsetX = 0
    this.stop.push(
      useEventListener(
        this.canvas,
        'touchstart',
        (e) => {
          offsetY = this.canvas.offsetTop
          offsetX = this.canvas.offsetLeft
          this.ctx.beginPath()
          this.ctx.moveTo(
            e.changedTouches[0].pageX + 2 - offsetX,
            e.changedTouches[0].pageY - offsetY,
          )
        },
        false,
      ),
    )
    let down = false
    this.stop.push(
      useEventListener(
        this.canvas,
        'mousedown',
        (e) => {
          offsetY = this.canvas.offsetTop
          offsetX = this.canvas.offsetLeft
          down = true
          this.ctx.beginPath()
          this.ctx.moveTo(e.pageX + 2 - offsetX, e.pageY - offsetY)
        },
        false,
      ),
    )
    this.stop.push(
      useEventListener(
        this.canvas,
        'mousemove',
        (e) => {
          if (!down)
            return
          this.ctx.lineTo(e.pageX + 2 - offsetX, e.pageY - offsetY)
          this.ctx.stroke()
        },
        false,
      ),
    )
    this.stop.push(
      useEventListener(this.canvas, 'mouseup', () => (down = false)),
    )
    this.stop.push(
      useEventListener(this.canvas, 'mouseout', () => (down = false)),
    )
    this.stop.push(
      useEventListener(
        this.canvas,
        'touchmove',
        (e) => {
          this.ctx.lineTo(
            e.changedTouches[0].pageX + 2 - offsetX,
            e.changedTouches[0].pageY - offsetY,
          )
          this.ctx.stroke()
        },
        false,
      ),
    )
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  mount(el: MaybeElement) {
    insertElement(el, this.canvas, null)
    this.listen()
    return this
  }

  setColor(color: string) {
    this.color = color
    this.ctx.strokeStyle = color
  }

  setBgColor(color: string) {
    this.bg = color
    // 保存当前画布内容到临时画布
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = this.canvas.width
    tempCanvas.height = this.canvas.height
    const tempCtx = tempCanvas.getContext('2d')!
    tempCtx.drawImage(this.canvas, 0, 0)
    // 清空画布
    this.clearCanvas()
    // 重绘背景
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    // 重绘之前的内容
    this.ctx.drawImage(tempCanvas, 0, 0)
  }

  unmount() {
    removeElement(this.canvas)
    this.stop.forEach(s => s())
  }

  listen() {
    useEventListener(this.canvas, 'mousedown', () => {
      this.active = true
    })
    useEventListener(this.canvas, 'mouseup', () => {
      this.active = false
      const { width, height } = this.canvas
      const imageData = this.ctx.getImageData(0, 0, width, height)
      this.historyStack.push(imageData)
    })
    useEventListener(this.canvas, 'mouseout', () => {
      this.active = false
    })
    useKeyBoard('Ctrl+z', () => this.undo())
    useKeyBoard('Ctrl+x', () => this.redo())
  }

  undo() {
    if (this.historyStack.length === 0)
      return
    // 清空画布
    this.clearCanvas()
    // 删除当前操作
    this.resetStack.push(this.historyStack.pop()!)
    // 逐个执行绘图动作进行重绘
    this.historyStack.forEach(imageData =>
      this.ctx.putImageData(imageData, 0, 0),
    )
  }

  redo() {
    if (this.resetStack.length === 0)
      return
    // 清空画布
    this.clearCanvas()
    // 删除当前操作
    this.historyStack.push(this.resetStack.pop()!)
    // 逐个执行绘图动作进行重绘
    this.historyStack.forEach(imageData =>
      this.ctx.putImageData(imageData, 0, 0),
    )
  }

  erase(lineWidth = 2) {
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    this.ctx.globalCompositeOperation = 'destination-out'
  }

  unerased() {
    this.ctx.strokeStyle = this.color
    this.ctx.globalCompositeOperation = 'source-over'
  }

  save() {
    return this.canvas.toDataURL('image/png')
  }
}

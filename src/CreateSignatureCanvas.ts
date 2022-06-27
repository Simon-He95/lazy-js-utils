import type { ISignature } from './types'
export class CreateSignatureCanvas implements ISignature {
  canvas: HTMLCanvasElement = document.createElement('canvas')
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!
  constructor(w = 400, h = 400) {
    this.createCanvas(w, h)
  }

  createCanvas(w = 400, h = 400) {
    this.canvas.width = w
    this.canvas.height = h
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    this.ctx.fillRect(0, 0, w, h)
    this.ctx.strokeStyle = '#000000'
    this.ctx.lineWidth = 2
    this.ctx.lineCap = 'round'
    let offsetY = 0
    let offsetX = 0
    this.canvas.addEventListener('touchstart', (e) => {
      offsetY = this.canvas.offsetTop
      offsetX = this.canvas.offsetLeft
      this.ctx.beginPath()
      this.ctx.moveTo(e.changedTouches[0].pageX + 2 - offsetX, e.changedTouches[0].pageY - offsetY)
    }, false)
    let down = false
    this.canvas.addEventListener('mousedown', (e) => {
      offsetY = this.canvas.offsetTop
      offsetX = this.canvas.offsetLeft
      down = true
      this.ctx.beginPath()
      this.ctx.moveTo(e.pageX + 2 - offsetX, e.pageY - offsetY)
    }, false)

    this.canvas.addEventListener('mousemove', (e) => {
      if (!down)
        return
      this.ctx.lineTo(e.pageX + 2 - offsetX, e.pageY - offsetY)
      this.ctx.stroke()
    }, false)
    this.canvas.addEventListener('mouseup', () => down = false)

    this.canvas.addEventListener('mouseout', () => down = false)

    this.canvas.addEventListener('touchmove', (e) => {
      this.ctx.lineTo(e.changedTouches[0].pageX + 2 - offsetX, e.changedTouches[0].pageY - offsetY)
      this.ctx.stroke()
    }, false)
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  save() {
    return this.canvas.toDataURL('image/png')
  }
}

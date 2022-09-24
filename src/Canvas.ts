export class Canvas {
  canvas: HTMLCanvasElement = document.createElement('canvas')
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!
  constructor(width?: number, height?: number) {
    if (width)
      this.canvas.width = width
    if (height)
      this.canvas.height = height
    return this
  }
}

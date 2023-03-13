export class Canvas {
  canvas = document.createElement('canvas')
  ctx = this.canvas.getContext('2d')!
  constructor(width?: number, height?: number) {
    if (width)
      this.canvas.width = width * devicePixelRatio
    if (height)
      this.canvas.height = height * devicePixelRatio
    return this
  }
}

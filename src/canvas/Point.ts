export class Point {
  r: number
  ctx: CanvasRenderingContext2D
  color: string
  constructor(ctx: CanvasRenderingContext2D, r = 1, color = '#fff') {
    this.r = r
    this.ctx = ctx
    this.color = color
  }

  draw(x: number, y: number, color?: string, r?: number) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, r ?? this.r, 0, 2 * Math.PI)
    this.ctx.fillStyle = color ?? this.color
    this.ctx.fill()
  }
}

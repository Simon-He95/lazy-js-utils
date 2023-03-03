export class Line {
  ctx: CanvasRenderingContext2D
  color: string
  constructor(ctx: CanvasRenderingContext2D, color = '#fff') {
    this.ctx = ctx
    this.color = color
  }

  draw(points: number[][], color?: string) {
    this.ctx.beginPath()
    points.forEach(([x, y]) => this.ctx.lineTo(x, y))
    this.ctx.strokeStyle = color ?? this.color
    this.ctx.stroke()
  }
}

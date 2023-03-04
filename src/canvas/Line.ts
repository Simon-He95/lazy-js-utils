export class Line {
  ctx: CanvasRenderingContext2D
  color: string
  isFill: boolean
  constructor(ctx: CanvasRenderingContext2D, color = '#fff', isFill = false) {
    this.ctx = ctx
    this.color = color
    this.isFill = isFill
  }

  draw(points: number[][], color?: string) {
    this.ctx.beginPath()
    points.forEach(([x, y]) => this.ctx.lineTo(x, y))
    if (this.isFill) {
      this.ctx.fillStyle = color ?? this.color
      this.ctx.fill()
    }
    else {
      this.ctx.strokeStyle = color ?? this.color
      this.ctx.stroke()
    }
  }
}

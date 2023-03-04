import { Line } from './Line'

export class Square {
  ctx: CanvasRenderingContext2D
  r: number
  color: string
  isFill: boolean
  constructor(
    ctx: CanvasRenderingContext2D,
    r = 1,
    color = '#fff',
    isFill = false,
  ) {
    this.ctx = ctx
    this.r = r
    this.color = color
    this.isFill = isFill
  }

  draw(x: number, y: number, r?: number) {
    this.ctx.beginPath()
    const line = new Line(this.ctx, this.color, this.isFill)
    const side = +(r ?? this.r)
    line.draw([
      [x, y],
      [x + side, y],
      [x + side, y + side],
      [x, y + side],
      [x, y],
    ])
  }
}

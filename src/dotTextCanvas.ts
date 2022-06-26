export class DotTextCanvas {
  canvas: HTMLCanvasElement = document.createElement('canvas')
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!
  points: Map<string, Array<number[]>> = new Map()
  originText: string
  fontSize: number
  color: string
  fontWeight: number
  textPointSet: Array<number[]> = []
  constructor(text: string, fontSize: number, color: string, fontWeight: number) {
    this.originText = text
    this.fontSize = fontSize
    this.color = color
    this.fontWeight = fontWeight
    this.executor()
  }

  createTextPoint(text: string) {
    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d')!; const size = 16
    canvas.width = canvas.height = size
    ctx.font = `${size}px SimSun`
    ctx.fillText(text, 0, 14)
    const canvasData = ctx.getImageData(0, 0, size, size).data
    const textPointSet = []
    for (let i = 0; i < size; i++) {
      const temp: number[] = []
      textPointSet.push(temp)
      for (let j = 0; j < size; j++) {
        const index = i * size * 4 + j * 4
        temp.push(canvasData[index + 3] ? 1 : 0)
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
      (this.points.get(this.originText[i]) || []).forEach((item, index) => {
        result[index] = (result[index] || []).concat(item)
      })
    }
    return result
  }

  getCanvas(color?: string) {
    this.color = color || this.color
    const h = this.textPointSet.length
    const w = this.textPointSet[0].length
    const oneTempLength = this.fontSize / h
    this.canvas.height = this.fontSize
    this.canvas.width = this.fontSize * this.originText.length
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (this.textPointSet[i][j]) {
          this.ctx.beginPath()
          this.ctx.arc(oneTempLength * (j + 0.5), oneTempLength * (i + 0.5), oneTempLength * this.fontWeight / h, 0, Math.PI * 2)
          this.ctx.fillStyle = this.color
          this.ctx.fill()
        }
      }
    }
  }

  clearCanvas() {
    this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
  }
}

export class DotImageCanvas {
  canvas: HTMLCanvasElement = document.createElement('canvas')
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!
  points: Map<string, Array<number[]>> = new Map()
  originSrc: string
  color: string
  fontWeight: number
  imagePointSet: Array<number[]> = []
  image?: HTMLImageElement
  constructor(src: string, color: string, fontWeight: number) {
    this.originSrc = src
    this.color = color
    this.fontWeight = fontWeight
    this.executor()
  }

  createDotImage() {
    const canvasData = this.ctx.getImageData(0, 0, this.image!.width, this.image!.height).data
    const imagePointSet = []
    for (let i = 0; i < this.image!.height; i++) {
      const temp: number[] = []
      imagePointSet.push(temp)
      for (let j = 0; j < this.image!.width; j++) {
        const index = (i * this.image!.width * 4 + j * 4)
        if (canvasData[index + 0] > 230 && canvasData[index + 1] > 230 && canvasData[index + 2] > 230)
          temp.push(0)
        else
          temp.push(canvasData[index + 3] ? 1 : 0)
      }
    }
    this.points.set(this.originSrc, imagePointSet)
    return imagePointSet
  }

  createImage() {
    if (this.hasImage())
      return
    const img = new Image()
    img.src = this.originSrc
    return new Promise((resolve, reject) => {
      try {
        img.onload = () => {
          this.image = img
          this.canvas.width = img.width * 0.8
          this.canvas.height = img.height * 0.8
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
          this.imagePointSet = this.createDotImage()
          resolve(img)
        }
      }
      catch (error) {
        reject(new Error(`图片加载失败,请检查图片路径:${this.originSrc}`))
      }
    })
  }

  hasImage() {
    return this.points.has(this.originSrc)
  }

  async executor() {
    await this.createImage()
    this.getCanvas()
  }

  getCanvas() {
    const h = this.imagePointSet.length
    const w = this.imagePointSet[0].length
    const oneTempLength = this.image!.width / h
    this.canvas.height = this.image!.height
    this.canvas.width = this.image!.width
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (this.imagePointSet[i][j]) {
          this.ctx.beginPath()
          this.ctx.arc(oneTempLength * (j + 0.5), oneTempLength * (i + 0.5), this.fontWeight * 50 / this.image!.width, 0, Math.PI * 2)
          this.ctx.fillStyle = this.color
          this.ctx.fill()
        }
      }
    }
  }

  repaint(src: string, color: string, fontWeight: number) {
    this.originSrc = src
    this.color = color
    this.fontWeight = fontWeight
    this.executor()
    return this
  }

  clearCanvas() {
    this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
  }
}

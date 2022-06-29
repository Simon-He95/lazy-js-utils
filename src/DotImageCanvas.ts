export class DotImageCanvas {
  canvas: HTMLCanvasElement = document.createElement('canvas')
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!
  points: Map<string, Record<string, any>> = new Map()
  originSrc = ''
  color = ''
  fontWeight = 1
  imagePointSet: Array<number[]> = []
  status = 'pending'
  constructor(src: string, color: string, fontWeight: number) {
    this.initOptions(src, color, fontWeight)
    this.executor()
  }

  createDotImage() {
    const canvasData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data
    const imagePointSet = []
    for (let i = 0; i < this.canvas.height; i++) {
      const temp: any[] = []
      imagePointSet.push(temp)
      for (let j = 0; j < this.canvas.width; j++) {
        const index = (i * this.canvas.width * 4 + j * 4)
        const color = `rgba(${canvasData[index + 0]},${canvasData[index + 1]},${canvasData[index + 2]},${canvasData[index + 3]})`
        if (canvasData[index + 0] > 230 && canvasData[index + 1] > 230 && canvasData[index + 2] > 230)
          temp.push(0)
        else
          temp.push(canvasData[index + 3] ? color : 0)
      }
    }
    this.points.set(this.originSrc, { width: this.canvas.width, imagePointSet, height: this.canvas.height })
    return imagePointSet
  }

  createImage() {
    if (this.hasImage()) {
      const { imagePointSet, width, height } = this.points.get(this.originSrc) as Record<string, any>
      this.imagePointSet = imagePointSet
      this.canvas.width = width
      this.canvas.height = height
      return
    }
    const img = new Image()
    return new Promise((resolve, reject) => {
      img.src = this.originSrc
      img.onload = () => {
        this.canvas.width = img.width
        this.canvas.height = img.height
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        this.imagePointSet = this.createDotImage()
        resolve(img)
      }
      img.onerror = () => {
        this.status = 'fail'
        reject(new Error('create image error'))
      }
    })
  }

  hasImage() {
    return this.points.has(this.originSrc)
  }

  async executor() {
    try {
      await this.createImage()
      this.clearCanvas()
      this.status = 'success'
      this.getCanvas()
    }
    catch (error) {
    }
  }

  getCanvas() {
    const h = this.imagePointSet.length
    const w = this.imagePointSet[0].length
    const oneTempLength = this.canvas.width * 1 / h
    this.ctx.scale(0.8, 0.8)
    this.ctx.translate(this.canvas.width * 0.1, this.canvas.height * 0.1)
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (this.imagePointSet[i][j]) {
          this.ctx.beginPath()
          this.ctx.arc(oneTempLength * (j + 0.5), oneTempLength * (i + 0.5), this.fontWeight * 50 / this.canvas.width, 0, Math.PI * 2)
          this.ctx.fillStyle = this.color || (this.imagePointSet[i][j] || 'black') as string
          this.ctx.fill()
        }
      }
    }
  }

  initOptions(src: string, color: string, fontWeight: number) {
    this.originSrc = src
    this.color = color
    this.fontWeight = fontWeight
  }

  async repaint(src: string, color: string, fontWeight: number) {
    this.initOptions(src, color, fontWeight)
    await this.executor()
    return this
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

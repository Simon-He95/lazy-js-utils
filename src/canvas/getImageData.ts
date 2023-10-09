import { Canvas } from './Canvas'

interface ImageData {
  width: number
  height: number
  data: Uint8ClampedArray
}
export function getImageData(src: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image()
      image.src = src
      image.onload = function () {
        const { width, height } = image
        const { ctx } = new Canvas(width, height)
        ctx.drawImage(image, 0, 0)
        resolve({
          width,
          height,
          data: ctx.getImageData(0, 0, width, height).data,
        })
      }
      image.onerror = reject
    } catch (error) {
      reject(error)
    }
  })
}

import Jspdf from 'jspdf'
import { uuid } from './uuid'

export async function exportPdf(src: string, filename: string = uuid(8)) {
  return toPDF(await transformPicture(src), filename)
}

async function transformPicture(src: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const { data } = imgData
      for (let i = 0; i < data.length; i += 4) {
        // 得到 RGBA 通道的值
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        if ([r, g, b].every(v => v < 256 && v > 245))
          data[i + 3] = 0
      }
      ctx?.putImageData(imgData, 0, 0)
      resolve(canvas)
    }
  })
}

export function toPDF(canvas: HTMLCanvasElement, filename: string) {
  const pdfX = (canvas.width + 10) / 2 * 0.75
  const pdfY = (canvas.height + 10) / 2 * 0.75
  const imgX = pdfX
  const imgY = (canvas.height / 2 * 0.75)
  const PDF = new Jspdf('p', 'pt', [pdfX, pdfY])
  PDF.addImage(canvas.toDataURL('image/png', 1.0), 'png', 0, 0, imgX, imgY)
  PDF.save(`${filename}.pdf`)
}

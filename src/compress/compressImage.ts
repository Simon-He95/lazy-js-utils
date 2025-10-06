import { Canvas } from '../canvas/Canvas'
import { isFile } from '../is/isFile'

type CompressImageOptionsType = 'base64' | 'blob'
interface CompressImageOptions {
  quality?: number
  maxWidth?: number
  maxHeight?: number
  type?: CompressImageOptionsType
}

export function compressImage(
  source: string | File,
  options: CompressImageOptions = {},
) {
  return new Promise((resolve) => {
    const { quality = 0.1, maxWidth, maxHeight, type = 'base64' } = options
    fileToDataURL(
      source,
      resolve,
      quality,
      type as CompressImageOptionsType,
      maxWidth,
      maxHeight,
    )
  })
}

/**
 * @description EN: Compress an image (File or data URL) to a smaller size. Returns a base64 string or Blob depending on `options.type`.
 * @param source - File or data URL string
 * @param options - Compression options (quality, maxWidth, maxHeight, type)
 * @returns Promise<string|Blob> compressed result
 */

function fileToDataURL(
  source: Blob | string,
  resolve: (blob: Blob | string) => void,
  quality: number,
  type: CompressImageOptionsType,
  maxWidth?: number,
  maxHeight?: number,
) {
  if (isFile(source)) {
    const reader = new FileReader()
    reader.readAsDataURL(source as Blob)
    reader.onload = function (e) {
      dataURLtoImage(e.target?.result as string)
    }
  }
  else {
    dataURLtoImage(source as string)
  }

  function dataURLtoImage(dataurl: string) {
    const img = new Image()
    img.src = dataurl
    if (maxWidth)
      img.width = maxWidth
    if (maxHeight)
      img.height = maxHeight
    img.onload = function () {
      imageToCanvas(img)
    }
  }

  function imageToCanvas(image: HTMLImageElement) {
    const { canvas, ctx } = new Canvas()
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    if (type === 'blob')
      canvasResizeToFile(canvas)
    else canvasResizeToDataURL(canvas)
  }

  function canvasResizeToFile(canvas: HTMLCanvasElement) {
    canvas.toBlob(blob => resolve(blob!), 'image/jpeg', quality)
  }

  function canvasResizeToDataURL(canvas: HTMLCanvasElement) {
    resolve(canvas.toDataURL('image/jpeg', quality))
  }
}

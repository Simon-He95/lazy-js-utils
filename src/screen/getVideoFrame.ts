import { Canvas } from '../canvas'

/**
 * 从视频文件中获取指定时间帧的图片
 * @param file 视频类型的File对象
 * @param time 需要截取帧的时间（单位：秒）
 * @returns Promise<{ url: string; blob: Blob }>
 * @description EN: Extract a frame image from a video File at the given time (seconds) and return a blob URL and Blob.
 */
export async function getVideoFrame(
  file: File,
  time: number = 0,
): Promise<{ url: string, blob: Blob }> {
  if (!file.type.startsWith('video/')) {
    throw new Error('文件类型不是视频')
  }

  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)
    video.src = url
    video.muted = true
    video.autoplay = false

    video.onloadedmetadata = () => {
      if (time > video.duration) {
        URL.revokeObjectURL(url)
        reject(new Error('指定时间超出视频时长'))
        return
      }
      video.currentTime = time
    }

    video.onseeked = () => {
      const width = video.videoWidth
      const height = video.videoHeight
      if (!width || !height) {
        URL.revokeObjectURL(url)
        reject(new Error('无法获取视频尺寸'))
        return
      }
      const { canvas, ctx } = new Canvas()
      canvas.width = width
      canvas.height = height
      ctx.drawImage(video, 0, 0, width, height)
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)
        if (!blob) {
          reject(new Error('生成图片失败'))
          return
        }
        const frameUrl = URL.createObjectURL(blob)
        resolve({ url: frameUrl, blob })
      }, 'image/png')
    }

    video.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('视频加载失败'))
    }
  })
}

import { findElement } from './findElement'
import { isStr } from './isStr'

interface IVideo {
  width: number
  height: number
}
export function useCamera(video: IVideo = { width: 640, height: 480 }, container: string | HTMLVideoElement = 'video') {
  navigator.mediaDevices.getUserMedia({ video }).then((stream) => {
    const video = isStr(container)
      ? findElement(container) as HTMLVideoElement
      : container
    if (!video)
      return console.error('video element not found')
    video.srcObject = stream
    video.onloadedmetadata = () => video.play()
  })
}

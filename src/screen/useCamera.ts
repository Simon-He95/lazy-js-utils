import { findElement } from '../event/findElement'
import { isBool } from '../is/isBool'
import { isStr } from '../is/isStr'

interface IVideo {
  width: number
  height: number
}
export function useCamera(
  video: IVideo | boolean = { width: 640, height: 480 },
  container: string | HTMLVideoElement = 'video',
  autoplay?: boolean,
) {
  if (!navigator)
    return console.error('Not support navigator')
  if (isBool(video)) {
    autoplay = video
    video = { width: 640, height: 480 }
  }
  let el: HTMLVideoElement
  navigator.mediaDevices.getUserMedia({ video }).then((stream) => {
    el = isStr(container)
      ? (findElement(container) as HTMLVideoElement)
      : container
    if (!video)
      return console.error('video element not found')
    el.srcObject = stream
    if (autoplay)
      el.onloadedmetadata = () => el.play()
  })
  return () => {
    if (!el)
      return (autoplay = true)
    if (el.paused)
      return el.play()
    return el.pause()
  }
}

import { findElement } from '../event/findElement'
import { isBool } from '../is/isBool'
import { isStr } from '../is/isStr'

interface IVideo {
  width: number
  height: number
}
/**
 * 录像功能
 * @param video 容器大小 默认{ width: 640, height: 480 }
 * @param container 容器
 * @param autoplay 是否自动播放
 * @returns
 */
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

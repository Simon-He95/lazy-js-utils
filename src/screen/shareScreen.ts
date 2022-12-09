import { createElement } from '../event/createElement'
import { findElement } from '../event/findElement'
import { isStr } from '../is/isStr'

export function shareScreen(
  container: string | HTMLElement,
  callback: (msg: string) => void,
) {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then(handleSuccess, reject)
    function handleSuccess(stream: MediaStream) {
      const video = createElement('video', {
        autoplay: '',
        playsinline: '',
        muted: '',
      })
      video.srcObject = stream
      if (isStr(container))
        container = findElement(container) || container
      if (isStr(container))
        reject(new Error(`${container} container is not a HTMLElement`))
      resolve('success')
      stream
        .getVideoTracks()[0]
        .addEventListener('ended', () => callback('已停止共享'))
      ;(container as HTMLElement).appendChild(video)
    }
  })
}

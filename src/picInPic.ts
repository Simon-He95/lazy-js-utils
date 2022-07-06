import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

export function picInPic(video: HTMLVideoElement | string) {
  addEventListener(document, 'DOMContentLoaded', () => {
    if (isStr(video))
      video = document.querySelector(video as string) as HTMLVideoElement || video
    if (isStr(video))
      throw new Error(`${video} is not found`)
  })

  return async () => {
    try {
      if (video !== document.pictureInPictureElement)
        await (video as HTMLVideoElement).requestPictureInPicture()
      else
        await document.exitPictureInPicture()
    }
    catch (error: any) {
      throw new Error(error)
    }
  }
}

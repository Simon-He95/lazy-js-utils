import { findElement } from '../event/findElement'
import { isStr } from '../is/isStr'

/**
 * 画中画模式
 * @param {  HTMLVideoElement | string } video video元素
 * @returns
 * @description EN: Toggle picture-in-picture for a given video element (or selector) and return an async function to perform the toggle.
 */
export function picInPic(video: HTMLVideoElement | string) {
  return async () => {
    if (isStr(video))
      video = (findElement(video) as unknown as HTMLVideoElement) || video
    if (isStr(video))
      throw new Error(`${video} is not a HTMLVideoElement`)
    try {
      if (video !== document.pictureInPictureElement)
        await (video as HTMLVideoElement).requestPictureInPicture()
      else await document.exitPictureInPicture()
    }
    catch (error: any) {
      throw new Error(error)
    }
  }
}

import { isStr } from './isStr'

export function picInPic(video: HTMLVideoElement | string) {
  return async () => {
    if (isStr(video))
      video = document.querySelector(video as string) as HTMLVideoElement || video
    if (isStr(video))
      throw new Error(`${video} is not a HTMLVideoElement`)
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

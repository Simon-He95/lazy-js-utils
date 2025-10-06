import { isArray } from '../is/isArray'
import { isVideo } from '../is/isVideo'
import { createElement } from '../event/createElement'

/**
 * 图片视频预加载函数
 * @param { string[] } list 图片数组
 * @param { string } style 设置样式
 * @returns { HTMLImageElement[] } 图片数组
 */
export function preload(list: string[] | string, style?: string) {
  /**
   * @description EN: Create and return image/video elements for the provided sources, optionally applying a style string.
   */
  let imageNode: HTMLImageElement
  let videoNode: HTMLVideoElement
  if (!isArray(list))
    list = [list as string]
  return (list as string[]).map(src =>
    isVideo(src) ? createVideo(src) : createImage(src),
  )
  function createImage(src: string) {
    if (!imageNode)
      imageNode = new Image()
    const image = imageNode.cloneNode() as HTMLImageElement
    image.src = src
    if (style)
      image.setAttribute('style', style)
    return image
  }
  function createVideo(src: string) {
    if (!videoNode)
      videoNode = createElement('video') as HTMLVideoElement
    const video = videoNode.cloneNode() as HTMLImageElement
    video.src = src
    if (style)
      video.setAttribute('style', style)
    return video
  }
}

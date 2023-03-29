import { isVideo } from '../is/isVideo'
import { createElement } from '../event/createElement'
import { useRequestIdleCallback } from './useRequestIdleCallback'

/**
 * 借助浏览器空闲时间去加载一些图片资源
 * @param { string[] } list 图片或视频地址数组
 * @param { number } timeRemaining 浏览器空闲时间大于多少去加载
 * @returns stop 取消副作用
 */
export function prefetch(list: string[], timeRemaining = 0) {
  const imageNode = new Image()
  const videoNode = createElement('video')
  return useRequestIdleCallback(
    list.map((src) => {
      if (isVideo(src)) {
        return () => {
          videoNode.src = src
        }
      }
      return () => {
        imageNode.src = src
      }
    }, timeRemaining),
  )
}

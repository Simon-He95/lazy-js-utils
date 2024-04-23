import { useEventListener } from './useEventListener'

/**
 * 检测浏览器滚动
 * @param { Function } callback 坚挺浏览器滚动条位置变化回调
 * @returns 停止
 */
export function useWindowScroll(
  callback: (left: number, top: number) => void,
): () => void {
  return useEventListener(document, 'scroll', () =>
    callback?.(
      document.documentElement.scrollLeft
      || window.pageXOffset
      || document.body.scrollLeft,
      document.documentElement.scrollTop
      || window.pageYOffset
      || document.body.scrollTop,
    ))
}

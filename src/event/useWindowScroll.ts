import { useEventListener } from './useEventListener'

/**
 * Listen to document scroll and call callback with current scrollLeft/scrollTop.
 *
 * @param callback - Receives (left, top)
 * @returns A stop function for the scroll listener
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

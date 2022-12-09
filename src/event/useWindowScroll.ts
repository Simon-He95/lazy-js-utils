import { useEventListener } from './useEventListener'
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
    ),
  )
}

import { useEventListener } from './useEventListener'

/**
 *
 * @param { Function } callback 浏览器尺寸变化回调
 * @returns
 */
export function useResizeObserver(
  callback: (width: number, height: number) => void,
) {
  return useEventListener(window, 'resize', () =>
    callback?.(
      document.documentElement.clientWidth || document.body.clientWidth,
      document.documentElement.clientHeight || document.body.clientHeight,
    ),
  )
}

import { useEventListener } from './useEventListener'

/**
 * Call the callback when the window is resized, returning the viewport width and height.
 *
 * @param callback - Receives (width, height)
 * @returns A stop function for the resize listener
 */
export function useResizeObserver(
  callback: (width: number, height: number) => void,
) {
  return useEventListener(window, 'resize', () =>
    callback?.(
      document.documentElement.clientWidth || document.body.clientWidth,
      document.documentElement.clientHeight || document.body.clientHeight,
    ))
}

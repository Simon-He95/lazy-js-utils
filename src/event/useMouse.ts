import { useEventListener } from './useEventListener'

/**
 * Throttled mousemove listener. The callback will be called at most once per `delay` ms.
 *
 * @param callback - MouseEvent handler
 * @param delay - Minimum ms between invocations
 * @returns A stop function to remove the listener
 */
export function useMouse(
  callback: (e: MouseEvent) => void,
  delay = 0,
): () => void {
  let timeStart = Date.now()
  return useEventListener(window, 'mousemove', (e) => {
    if (Date.now() - timeStart >= delay) {
      timeStart = Date.now()
      callback(e)
    }
  })
}

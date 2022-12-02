import { useEventListener } from './useEventListener'
export function useResizeObserver(callback: (...args: any[]) => void) {
  return useEventListener(window, 'resize', () => callback?.(document.documentElement.clientWidth || document.body.clientWidth, document.documentElement.clientHeight || document.body.clientHeight))
}

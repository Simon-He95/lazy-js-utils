import { useEventListener } from './useEventListener'
export function useResizeObserver(callback: (width: number, height: number) => void) {
  return useEventListener(window, 'resize', () => callback?.(document.documentElement.clientWidth || document.body.clientWidth, document.documentElement.clientHeight || document.body.clientHeight))
}

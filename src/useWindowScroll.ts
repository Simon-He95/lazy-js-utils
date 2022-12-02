import { useEventListener } from './useEventListener'
export function useWindowScroll(callback: (...args: any[]) => void): (() => void) {
  return useEventListener(document, 'scroll', () => callback?.(document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft, document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop))
}

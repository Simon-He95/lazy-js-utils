import { addEventListener } from './addEventListener'
export function useResizeObserver(callback: (...args: any[]) => void) {
  return addEventListener(window, 'resize', () => callback(document.documentElement.clientWidth || document.body.clientWidth, document.documentElement.clientHeight || document.body.clientHeight))
}

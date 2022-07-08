import { addEventListener } from './addEventListener'
export function useWindowScroll(callback: (...args: any[]) => void): (() => void) {
  return addEventListener(document, 'scroll', () => callback(document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft, document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop))
}

import { isStr } from './isStr'

export function useElementBounding(el: Element | string): DOMRect {
  if (isStr(el))
    el = document.querySelector(el as string) as Element || el
  if (isStr(el))
    throw new Error(`${el} is not a Element`)
  return (el as Element).getBoundingClientRect()
}

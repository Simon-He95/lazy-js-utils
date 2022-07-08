import { isStr } from './isStr'

export function useElementBounding(element: Element | string): DOMRect {
  if (isStr(element))
    element = document.querySelector(element as string) as Element || element
  if (isStr(element))
    throw new Error(`${element} is not a Element`)
  return (element as Element).getBoundingClientRect()
}

import { isStr } from './isStr'

export function removeElement(el: HTMLElement | ChildNode | string): HTMLElement | ParentNode | null {
  if (isStr(el))
    el = document.querySelector(el as string) as HTMLElement || el
  if (isStr(el))
    throw new Error(`${el} is not a element`)
  const p = (el as HTMLElement).parentNode
  if (p)
    p.removeChild(el as HTMLElement)
  return p
}

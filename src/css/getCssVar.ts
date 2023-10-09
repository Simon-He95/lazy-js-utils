import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'

export function getCssVar(
  element: MaybeElement,
  style: string,
  callback: (css: string) => void,
) {
  return mount(element, (el) =>
    callback?.(getComputedStyle(el).getPropertyValue(style)),
  )
}

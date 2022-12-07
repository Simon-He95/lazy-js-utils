import { mount } from '../utils/mount'

export function getCssVar(element: string | HTMLElement, style: string, callback: (css: string) => void) {
  return mount(element, el => callback?.(getComputedStyle(el).getPropertyValue(style)))
}

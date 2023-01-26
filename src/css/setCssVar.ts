import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'

export function setCssVar(
  element: MaybeElement,
  styleObj: Record<string, string>,
) {
  return mount(
    element,
    el =>
      styleObj
      && Object.keys(styleObj).forEach(key =>
        (el as HTMLElement).style.setProperty(key, styleObj[key]),
      ),
  )
}

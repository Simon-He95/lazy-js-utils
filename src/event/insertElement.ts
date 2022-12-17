import { mount } from '../utils/mount'
import { isNull } from '../is/isNull'

export function insertElement(
  parent: HTMLElement | string,
  element: HTMLElement | string,
  target?: HTMLElement | null,
): void {
  return mount(parent, element, (parent, element) =>
    (parent as HTMLElement).insertBefore(
      element as HTMLElement,
      isNull(target) ? null : target || (parent as HTMLElement).firstChild,
    ),
  )
}

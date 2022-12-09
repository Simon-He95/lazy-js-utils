import { mount } from '../utils/mount'

export function insertElement(
  parent: HTMLElement | string,
  element: HTMLElement | string,
  target?: HTMLElement | null,
): void {
  mount(parent, element, (parent, element) =>
    (parent as HTMLElement).insertBefore(
      element as HTMLElement,
      target === undefined ? (parent as HTMLElement).firstChild : target,
    ),
  )
}

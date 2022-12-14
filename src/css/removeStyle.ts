import { isArray } from '../is/isArray'
import { mount } from '../utils/mount'

export function removeStyle(
  el: HTMLElement | string,
  styles: string[] | string,
) {
  const removeStyles: string[] = isArray(styles) ? styles : [styles]
  return mount(el, (el) => {
    const css = el.style.cssText
    el.style.cssText = removeStyles
      .reduce(
        (result: string, style: string) => result.replace(getReg(style), ''),
        css,
      )
      .trim()
  })
}

function getReg(style: string) {
  return new RegExp(`${style}: [\\w()!\\-,.\\s0-9]+;`)
}

import { stringify } from '../object/stringify'
import { mount } from '../utils/mount'

export function setStyle(
  el: HTMLElement | string,
  styleObj: Record<string, any>,
) {
  const styles = stringify(styleObj, {
    sep: ';',
    eq: ':',
    hyp: true,
  })
  return mount(el, (el) => {
    el.style.cssText = el.style.cssText + styles
  })
}

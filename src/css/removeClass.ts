import { mount } from '../utils'
import type { MaybeElement } from './../types'

export function removeClass(selector: MaybeElement, className: string) {
  return mount(selector, el => el.classList.remove(className))
}

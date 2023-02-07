import { mount } from '../utils'
import type { MaybeElement } from './../types'

export function addClass(selector: MaybeElement, className: string) {
  return mount(selector, el => el.classList.add(className))
}

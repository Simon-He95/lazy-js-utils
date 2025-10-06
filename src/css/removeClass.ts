import { mount } from '../utils'
import type { MaybeElement } from './../types'

/**
 * dom上删除class
 * @description EN: Remove a CSS class from the provided element(s).
 * @param { MaybeElement } selector 元素
 * @param { string } className class类
 * @returns
 */
export function removeClass(selector: MaybeElement, className: string) {
  return mount(selector, el => el.classList.remove(className))
}

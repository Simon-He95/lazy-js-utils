import { mount } from '../utils'
import type { MaybeElement } from './../types'

/**
 * dom上添加class
 * @param { MaybeElement } selector 元素
 * @param { string } className class类
 * @returns
 */
export function addClass(selector: MaybeElement, className: string) {
  return mount(selector, el => el.classList.add(className))
}

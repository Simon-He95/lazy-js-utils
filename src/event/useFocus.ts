import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { findElement } from './findElement'

/**
 * input聚焦
 * @param { MaybeElement } target 元素
 */
export function useFocus(target: MaybeElement = 'body') {
  const isBody = target === 'body'
  mount(target, (target) => {
    findElement('input', isBody ? target : target.parentElement!)?.focus()
  })
}

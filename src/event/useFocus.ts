import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { findElement } from './findElement'

/**
 *
 * @param { MaybeElement } target 元素
 */
export function useFocus(target: MaybeElement) {
  mount(target, target =>
    findElement('input', target.parentElement!)?.focus(),
  )
}

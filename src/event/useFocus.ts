import { mount } from '../utils/mount'
import { findElement } from './findElement'

/**
 *
 * @param { string | HTMLElement } target 元素
 */
export function useFocus(target: string | HTMLElement) {
  mount(target, target =>
    findElement('input', target.parentElement!)?.focus(),
  )
}

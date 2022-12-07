import { mount } from '../utils/mount'
import { findElement } from './findElement'
export function useFocus(target: string | HTMLElement) {
  mount(target, target => findElement('input', target.parentElement!)?.focus())
}

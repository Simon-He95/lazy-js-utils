import { findElement } from './findElement'
import { mount } from './mount'
export function useFocus(target: string | HTMLElement) {
  mount(target, target => findElement('input', target.parentElement!)?.focus())
}

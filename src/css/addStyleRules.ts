import { mount } from '../utils'

/**
 *
 * @param { string } rule '#blanc { color: white }'
 * @param { number } [index] cssRules 中的位置
 * @description EN: Insert a CSS rule string into the first stylesheet at an optional index.
 */
export function addRules(rule: string, index?: number) {
  mount(() => {
    document.styleSheets[0].insertRule(rule, index)
  })
}

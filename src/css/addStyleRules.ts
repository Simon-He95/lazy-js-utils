import { mount } from '../utils'

/**
 *
 * @param { string } rule '#blanc { color: white }'
 * @param { number } [index] cssRules 中的位置
 */
export function addRules(rule: string, index?: number) {
  mount(() => {
    document.styleSheets[0].insertRule(rule, index)
  })
}

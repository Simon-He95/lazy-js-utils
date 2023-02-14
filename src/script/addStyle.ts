import { createElement } from '../event/createElement'
import { removeElement } from '../event/removeElement'
import { insertElement } from '../event/insertElement'
import { isStr } from '../is/isStr'
import { hyphenate } from '../string'
import { addStyleScoped } from './addStyleScoped'
/**
 * 将style添加到head
 * @param { string } s style
 * @param { string } scoped 独立作用域 针对局部组件生效<div data-v-xxx></div>, 传入data-v-xxx
 * @returns
 */
type StyleObject = Record<string, Record<string, string | number>>
export async function addStyle(
  s: string | StyleObject,
  scoped?: string,
): Promise<() => void> {
  const style = !isStr(s)
    ? Object.keys(s).reduce((result, key) => {
      const obj = s[key]
      return (result += `${key} { ${Object.keys(obj).reduce(
          (r, k: any) => (r += `${hyphenate(k)}: ${obj[k]};`),
          '',
        )} }`)
    }, '')
    : s

  const styleEl = createElement(
    'style',
    {
      type: 'text/css',
    },
    scoped ? addStyleScoped(style, scoped) : style,
  )
  insertElement(document.head, styleEl, null)
  return () => removeElement(style)
}

// addStyle({
//   '#main': {
//     backgroundColor: 'red',
//     fontSize: '20px',
//   },
// }, 'data-v-xxx')

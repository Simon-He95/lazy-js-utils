import { createElement } from '../event/createElement'
import { removeElement } from '../event/removeElement'
import { insertElement } from '../event/insertElement'
import { isStr } from '../is/isStr'
import { hyphenate } from '../string'
import { addStyleScoped } from './addStyleScoped'

/**
 * Inject CSS into the document head.
 *
 * `s` may be a CSS string or an object of rules. If `scoped` is provided the
 * style will be transformed to a scoped variant via `addStyleScoped`.
 *
 * @param {string|StyleObject} s CSS string or style object.
 * @param {string} [scoped] Optional scope id to scope the styles.
 * @returns {() => void} Function to remove the injected style.
 */
type StyleObject = Record<string, Record<string, string | number>>
export function addStyle(s: string | StyleObject, scoped?: string) {
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
  return () => removeElement(styleEl)
}

// addStyle({
//   '#main': {
//     backgroundColor: 'red',
//     fontSize: '20px',
//   },
// }, 'data-v-xxx')

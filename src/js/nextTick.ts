import { useMutationObserver } from '../event/useMutationObserver'
import { createTextNode } from '../event/createTextNode'

/**
 *
 * @param { () => any } flushCallbacks 函数
 * @returns
 */
export function nextTick(flushCallbacks: () => any): void {
  if (typeof Promise !== 'undefined') {
    Promise.resolve().then(flushCallbacks)
  } else if (typeof MutationObserver !== 'undefined') {
    const textNode = createTextNode('0')
    useMutationObserver(textNode, flushCallbacks, { characterData: true })
    textNode.data = '1'
  } else {
    setTimeout(flushCallbacks)
  }
}

import { useMutationObserver } from '../event/useMutationObserver'
import { createTextNode } from '../event/createTextNode'

/**
 * 下一次执行任务
 * @description EN: Schedule a callback to run on the next microtask (via Promise). Falls back to MutationObserver or setTimeout when Promises are unavailable.
 * @param { () => any } flushCallbacks 待执行的回调函数
 */
export function nextTick(flushCallbacks: () => any): void {
  if (typeof Promise !== 'undefined') {
    Promise.resolve().then(flushCallbacks)
  }
  else if (typeof MutationObserver !== 'undefined') {
    const textNode = createTextNode('0')
    useMutationObserver(textNode, flushCallbacks, { characterData: true })
    textNode.data = '1'
  }
  else {
    setTimeout(flushCallbacks)
  }
}

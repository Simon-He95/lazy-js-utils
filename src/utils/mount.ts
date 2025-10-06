import { findElement } from '../event/findElement'
import { isStr } from '../is/isStr'

type MountArgs = [
  ...Array<
    string | Element | Window | Document | MediaQueryList | ParentNode | Text
  >,
  (...elements: HTMLElement[]) => void,
]
/**
 * 挂载：等待元素存在然后执行回调。支持选择器字符串或直接传入 DOM 对象。
 * - 最后一个参数必须是回调，前面的参数为要等待/解析的元素或选择器。
 * - 回调会在元素可用时被调用，并接收解析后的元素参数。
 *
 * @param ...args - 多个元素或选择器，最后一个参数为回调函数
 * @returns void
 * @description EN: Wait for one or more elements (or selectors) to become available and invoke the provided callback with the resolved elements. Useful for mounting listeners or components when DOM nodes may not exist yet.
 */
export function mount(...args: MountArgs): void {
  const len = args.length
  const params = [...args]
  const elements = params.slice(0, len - 1)
  const callback = params.slice(-1)[0] as unknown as (
    ...elements: Element[]
  ) => void
  let isMounted = false
  let hasMounted = false
  update()
  document.addEventListener('DOMContentLoaded', update)
  setTimeout(() => document.removeEventListener('DOMContentLoaded', update))
  function update() {
    if (hasMounted)
      return
    elements.forEach(
      (element, index) =>
        isStr(element)
        && (elements[index]
          = (findElement(element) as unknown as Element) || element),
    )
    if (!isMounted && elements.some(isStr))
      return (isMounted = true)
    if (elements.some(isStr)) {
      throw new Error(
        `${elements.filter(isStr).join(', ')} is not a HTMLElement`,
      )
    }
    callback?.(...(elements as Element[]))
    hasMounted = true
  }
}

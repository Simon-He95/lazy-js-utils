import { findElement } from '../event/findElement'
import { isStr } from '../is/isStr'

type MountArgs = [
  ...Array<
    string | Element | Window | Document | MediaQueryList | ParentNode | Text
  >,
  (...elements: HTMLElement[]) => void,
]
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
        isStr(element) && (elements[index] = findElement(element) || element),
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

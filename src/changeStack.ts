import { useMutationObserver } from './useMutationObserver'
export function changeStack(target: string | Element) {
  return useMutationObserver(target, () => {
    console.groupCollapsed('childList or sub tree or attributes changed')
    console.trace()
    console.groupEnd()
  }, {
    childList: true,
    subtree: true,
    attributes: true,
  })
}

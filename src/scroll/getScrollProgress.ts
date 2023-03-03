import { useEventListener } from '../event'
import { throttle } from '../perf'

export function getScrollProgress(
  callback: (percent: string) => void,
  time = 40,
) {
  const fn = throttle(callback, time)
  return useEventListener(window, 'scroll', () => fn(scrollWork()))
}
function scrollWork() {
  const pageHeight
    = document.body.scrollHeight || document.documentElement.scrollHeight
  const screenHeight
    = document.documentElement.clientHeight || document.body.clientHeight
  const scrollHeight = pageHeight - screenHeight
  const scrollTop
    = document.documentElement.scrollTop || document.body.scrollTop
  return `${(scrollTop / scrollHeight) * 100}%`
}

import { isUndef } from '../is/isUndef'
import { useRaf } from '../perf/useRaf'

/**
 * 滚动到顶部
 */
export function scrollToTop() {
  try {
    let pre: number
    const stop = useRaf(() => {
      const t = document.documentElement.scrollTop || document.body.scrollTop
      if (isUndef(pre)) pre = t
      if ((pre < t && (pre * 8) / 7 !== t) || t === 0) stop()
      if (t < 1) window.scrollTo(0, 0)
      else window.scrollTo(0, (pre = (7 * t) / 8))
    }, 0)
  } catch (error: any) {
    throw new Error(error)
  }
}

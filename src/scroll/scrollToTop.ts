import { isUndef } from '../is/isUndef'
import { useAnimationFrame } from '../perf/useRaf'
/**
 * 滚动到顶部
 */
export function scrollToTop() {
  try {
    let pre: number
    const stop = useAnimationFrame(() => {
      const t = document.documentElement.scrollTop || document.body.scrollTop
      if (isUndef(pre))
        pre = t
      if ((pre < t && (pre * 8) / 7 !== t) || t === 0)
        stop()
      window.scrollTo(0, (pre = (7 * t) / 8))
    }, 0)
  }
  catch (error: any) {
    throw new Error(error)
  }
}

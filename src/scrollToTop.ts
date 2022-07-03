import { animationFrameWrapper } from './animationFrameWrapper'
export function scrollToTop() {
  try {
    let pre: number
    const stop = animationFrameWrapper(() => {
      const t = document.documentElement.scrollTop || document.body.scrollTop
      if (pre === undefined)
        pre = t
      if ((pre + 5 < t && t < pre * 8 / 7) || t === 0)
        stop()
      window.scrollTo(0, pre = 7 * t / 8)
    }, 0)
  }
  catch (error: any) {
    throw new Error(error)
  }
}

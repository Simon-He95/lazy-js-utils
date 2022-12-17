import { isNull } from '../is/isNull'

export function debounce(fn: Function, time: number) {
  let timer: any = null
  return function (this: any, e?: any) {
    if (!isNull(timer))
      clearTimeout(timer)
    timer = setTimeout(() => {
      const result = fn.call(this, e)
      timer = null
      return result
    }, time)
  }
}

import { isNull } from '../is/isNull'

/**
 * 防抖函数
 * @param { Function } fn 函数
 * @param { number } time 时间（毫秒）
 * @returns { Function } 返回被防抖包装的函数
 * @description EN: Return a debounced version of `fn` that delays invocation until `time` milliseconds have passed without a new call.
 */
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

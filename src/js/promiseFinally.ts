import { isFn } from '../is/isFn'

/**
 *
 * @param { Function } fn 函数 ｜ 异步函数
 * @param { Function } finalFn 函数
 * @returns
 */
export async function promiseFinally(
  fn: Promise<any> | Function,
  finalFn: Function,
) {
  let result
  try {
    result = await (isFn(fn) ? fn() : fn)
  }
  finally {
    finalFn()
  }
  return result
}

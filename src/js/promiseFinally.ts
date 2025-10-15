import { isFn } from '../is/isFn'

/**
 * Promise 最终处理
 * @description EN: Run `fn` (sync or async) and always call `finalFn`, mirroring JavaScript `try/finally` behaviour for returned values and errors.
 * @param { Function | Promise<any> } fn 可以是函数或已存在的 Promise
 * @param { Function } finalFn 最终一定会执行的回调
 * @returns { Promise<any> }
 */
export async function promiseFinally(
  fn: Promise<any> | Function,
  finalFn: Function,
) {
  let result: any
  let error: any
  try {
    result = await (isFn(fn) ? (fn as Function)() : fn)
  }
  catch (err) {
    error = err
  }
  try {
    // 支持 finalFn 为异步函数并等待其完成
    await (isFn(finalFn) ? (finalFn as Function)() : finalFn)
  }
  catch (finalErr) {
    // 如果之前没有错误则抛出 finalFn 的错误，否则以之前的错误为主（和 JS finally 行为一致）
    if (!error)
      throw finalErr
  }
  if (error)
    throw error
  return result
}

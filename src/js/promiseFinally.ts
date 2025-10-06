import { isFn } from '../is/isFn'

/**
 *
 * @param { Function } fn 函数 ｜ 异步函数
 * @param { Function } finalFn 函数
 * @returns
 * @description EN: Execute `fn` (sync or async) and always call `finalFn` afterwards; propagate original or final errors similarly to a try/finally.
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

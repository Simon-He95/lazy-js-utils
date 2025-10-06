function normalizeError(err: any): Error {
  if (err instanceof Error)
    return err
  try {
    // try to preserve original value as cause when supported
    // Constructing Error with cause is non-standard in some runtimes/types, attempt and fallback via catch
    return new Error(String(err), { cause: err } as any)
  }
  catch (_) {
    const e = new Error(String(err))
    try {
      ;(e as any).cause = err
    }
    catch (_) {
      // ignore
    }
    return e
  }
}

export function interceptError<T extends (...args: any[]) => any>(fn: T) {
  /**
   * @description EN: Wrap a function so that thrown values and rejected Promises are normalized into Error instances.
   */
  // 返回一个包装函数，保留 this 与参数，同时支持同步异常和 Promise 拒绝
  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | Promise<ReturnType<T>> {
    try {
      const result = fn.apply(this, args) as any
      if (result && typeof result.then === 'function') {
        // 支持返回 Promise 的函数，捕获拒绝并以规范化错误向外抛出
        return result.catch((err: any) => {
          throw normalizeError(err)
        })
      }
      return result
    }
    catch (err) {
      throw normalizeError(err)
    }
  } as T
}

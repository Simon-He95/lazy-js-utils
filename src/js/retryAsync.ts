/**
 * 异步重试
 * @description EN: Retry an asynchronous function up to `retries` times before rethrowing the last error.
 * @param { () => Promise<T> } fn 待执行的异步函数
 * @param { number } retries 最大重试次数
 * @returns { Promise<T> }
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  retries: number,
): Promise<T> {
  try {
    return await fn()
  }
  catch (error: any) {
    if (retries > 0) {
      return retryAsync(fn, retries - 1)
    }
    else {
      throw error
    }
  }
}

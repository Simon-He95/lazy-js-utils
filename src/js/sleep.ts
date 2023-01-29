/**
 * 等待函数
 * @param { number }  ms 延迟秒数
 * @returns
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

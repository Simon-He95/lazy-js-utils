/**
 * 并行执行
 * @param { any[] } tasks 数组
 * @param { (...args: any[]) => any } fn 函数
 * @returns
 */
export function parallel(tasks: any[], fn: (...args: any[]) => any) {
  return Promise.all(tasks.map(fn))
}

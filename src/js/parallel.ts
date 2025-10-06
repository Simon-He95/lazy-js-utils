/**
 * 并行执行
 * @param { any[] } tasks 数组
 * @param { (...args: any[]) => any } fn 函数
 * @returns
 * @description EN: Execute `fn` over `tasks` in parallel and return a Promise resolved with all results.
 */
export function parallel(tasks: any[], fn: (...args: any[]) => any) {
  return Promise.all(tasks.map(fn))
}

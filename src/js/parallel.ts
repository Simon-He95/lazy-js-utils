export function parallel(tasks: any[], fn: (...args: any[]) => any) {
  return Promise.all(tasks.map(fn))
}

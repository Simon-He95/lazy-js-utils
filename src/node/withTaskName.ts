// gulpfile -> withTaskName('clean', async () => run('rm -rf dist')),
/**
 * 处理gulp任务
 * @param name 任务名
 * @param fn 任务函数
 * @returns
 * @description EN: Attach a displayName property to a function so tools like Gulp can show the task name.
 */
export function withTaskName<T extends Function>(name: string, fn: T) {
  return Object.assign(fn, { displayName: name })
}

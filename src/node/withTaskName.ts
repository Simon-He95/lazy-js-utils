// gulpfile -> withTaskName('clean', async () => run('rm -rf dist')),
/**
 * 处理gulp任务
 * @param name 任务名
 * @param fn 任务函数
 * @returns
 */
export const withTaskName = <T extends Function>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

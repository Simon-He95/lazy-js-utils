// gulpfile -> withTaskName('clean', async () => run('rm -rf dist')),
export const withTaskName = <T extends Function>(name: string, fn: T) => Object.assign(fn, { displayName: name })

import process from 'process'
/**
 *
 * @returns 处理argv --flag如果未设置值默认为true
 */
export function transformArgv() {
  return process?.argv?.slice(2).reduce((result, arg) => {
    const [key, value] = arg.split('=')
    result[key.slice(2)] = value || true
    return result
  }, {} as Record<string, any>)
}

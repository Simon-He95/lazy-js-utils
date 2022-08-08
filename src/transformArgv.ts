import process from 'process'
export function transformArgv() {
  return process?.argv?.slice(2).reduce((result, arg) => {
    const [key, value] = arg.split('=')
    result[key.slice(2)] = value || true
    return result
  }, {} as Record<string, any>)
}

import type { SpawnOptions, StdioOptions } from 'node:child_process'
import child_process from 'node:child_process'
import process from 'node:process'
import { isPlainObject } from '../is'
import { isArray } from '../is/isArray'
import type { IShellMessage } from '../types'

/**
 * 执行 shell 命令的工具函数，支持单个或多个命令的执行。
 *
 * @template T - 指令类型，可以是字符串或字符串数组。
 * @param {string | string[]} commander - 要执行的命令或命令数组。
 * @param {Options | Options['stdio']} [options] - 配置选项或 stdio 配置。
 * @param {string[]} [options.args] - 传递给命令的参数数组。
 * @param {StdioOptions} [options.stdio] - 子进程的 stdio 配置，默认为 'pipe'。
 * @param {boolean} [options.errorExit=true] - 是否在命令失败时退出进程。
 * @param {boolean} [options.isLog=false] - 是否在控制台输出日志。
 * @param {string} [options.cwd] - 子进程的工作目录。
 * @param {SpawnOptions} [options.options] - 额外的子进程配置选项。
 * @returns {Promise<IShellMessage | IShellMessage[]>} - 返回一个 Promise，解析为命令执行结果或结果数组。
 *
 * @throws {Error} - 如果命令执行失败且 `errorExit` 为 true，则抛出错误。
 *
 * @example
 * // 执行单个命令
 * jsShell('ls', { isLog: true })
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 *
 * @example
 * // 执行多个命令
 * jsShell(['ls', 'pwd'], { isLog: true })
 *   .then(results => console.log(results))
 *   .catch(error => console.error(error));
 */
interface Options {
  args?: string[]
  stdio?: StdioOptions | undefined
  errorExit?: boolean
  isLog?: boolean
  cwd?: string
  options?: SpawnOptions
}
export function jsShell<T extends string | string[]>(
  commander: T,
  options?: Options | Options['stdio'],
) {
  let args: string[] = []
  let stdio: StdioOptions | undefined
  let errorExit: boolean = true
  let isLog: boolean = false
  let cwd: string | undefined
  let _options: SpawnOptions = {}
  if (isPlainObject(options)) {
    args = (options as Options).args ?? []
    stdio = (options as Options).stdio
    errorExit = (options as Options).errorExit ?? true
    isLog = (options as Options).isLog ?? false
    cwd = (options as Options).cwd
    _options = (options as Options).options ?? {}
  }
  else if (options) {
    stdio = options
  }

  return (
    isArray(commander)
      ? Promise.all(commander.map(command => executor(command)))
      : executor(commander)
  ) as T extends string ? Promise<IShellMessage> : Promise<IShellMessage[]>
  function executor(commander: string): Promise<IShellMessage> {
    return new Promise((resolve, reject) => {
      const child = child_process.spawn(commander, args as string[], {
        shell: true,
        stdio,
        cwd,
        ..._options,
      })
      const pid = child.pid!
      let result = ''
      let errorOutput = ''
      child.stdout?.on('data', (data) => {
        result += data.toString()
      })

      child.stderr?.on('data', (data) => {
        if (isLog)
          console.error(data.toString())
        errorOutput += data.toString()
      })

      child.on('close', (status) => {
        result = result.trim()
        if (status === 130) {
          if (isLog)
            console.log('已取消...')
          resolve({ status, result, pid })
        }
        else if (status !== 0) {
          if (isLog)
            console.error(`Command failed with status ${status}`)
          if (errorExit) {
            reject(new Error(result || errorOutput))
            process.exit(1)
          }
          else {
            resolve({ status, result: result || errorOutput, pid })
          }
        }
        else {
          resolve({ status, result, pid })
        }
      })

      child.on('error', (error) => {
        if (isLog)
          console.error(error.message)
        if (errorExit) {
          reject(new Error(error.message))
          process.exit(1)
        }
        else {
          resolve({ status: null, result: error.message, pid })
        }
      })
    })
  }
}

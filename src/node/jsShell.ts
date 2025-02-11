import type { SpawnOptions, StdioOptions } from 'node:child_process'
import child_process from 'node:child_process'
import process from 'node:process'
import { isPlainObject } from '../is'
import { isArray } from '../is/isArray'
import type { IShellMessage } from '../types'

/**
 *
 * @param { string | string[] } commander 指令
 * @param { string } stdio 'inherit' | 'pipe'
 * @param { boolean } errorExit 错误时是否结束进程
 * @returns
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
      child.stdout?.on('data', (data) => {
        result += data.toString()
      })

      child.stderr?.on('data', (data) => {
        if (isLog)
          console.error(data.toString())
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
            reject(new Error(result))
            process.exit(1)
          }
          else {
            resolve({ status, result, pid })
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

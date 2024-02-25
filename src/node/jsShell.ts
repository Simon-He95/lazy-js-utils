import child_process from 'node:child_process'
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
  stdio?: 'inherit' | 'pipe'
  errorExit?: boolean
  isLog?: boolean
  cwd?: string
}
export function jsShell<T extends string | string[]>(
  commander: T,
  options: Options = {},
) {
  const { args = [], stdio = 'inherit', errorExit, isLog, cwd } = options

  return (
    isArray(commander)
      ? commander.map((command) => executor(command))
      : executor(commander)
  ) as T extends string ? IShellMessage : IShellMessage[]
  function executor(commander: string): IShellMessage {
    const { status, output } = child_process.spawnSync(
      commander,
      args as string[],
      {
        shell: true,
        encoding: 'utf8',
        stdio: stdio === 'inherit' ? 'inherit' : ['inherit', 'pipe', 'inherit'],
        cwd,
      },
    )
    const result = output[1]?.trim()
    if (status === 130) {
      if (isLog) console.log('已取消...')
      return { status, result } as IShellMessage
    }
    if (status !== 0) {
      if (isLog) console.log(result)
      if (errorExit) process.exit(1)
    }

    return { status, result } as IShellMessage
  }
}

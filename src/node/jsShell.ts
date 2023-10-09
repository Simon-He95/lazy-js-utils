import child_process from 'node:child_process'
import { isArray } from '../is/isArray'
import { isBool } from '../is/isBool'
import { isStr } from '../is/isStr'
import type { IShellMessage } from '../types'

export function jsShell<T extends string | string[]>(
  commander: T,
  errorExit?: boolean,
  isLog?: boolean,
): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(
  commander: T,
  stdio: 'inherit' | 'pipe',
  errorExit?: boolean,
  isLog?: boolean,
): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(
  commander: T,
  stdio: 'inherit' | 'pipe',
  errorExit?: boolean,
  isLog?: boolean,
): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(
  commander: T,
  args: string[],
  stdio?: 'inherit' | 'pipe',
  errorExit?: boolean,
  isLog?: boolean,
): T extends string ? IShellMessage : IShellMessage[]
/**
 *
 * @param { string | string[] } commander 指令
 * @param { string } stdio 'inherit' | 'pipe'
 * @param { boolean } errorExit 错误时是否结束进程
 * @returns
 */

export function jsShell<T extends string | string[]>(
  commander: T,
  args: string[] | boolean | 'inherit' | 'pipe' = [],
  stdio: 'inherit' | 'pipe' | boolean = 'inherit',
  errorExit?: boolean,
  isLog?: boolean,
) {
  if (isBool(args)) {
    errorExit = args as boolean
    args = []
    stdio = 'inherit'
  } else if (isStr(args)) {
    stdio = args as 'inherit' | 'pipe'
    args = []
  }
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

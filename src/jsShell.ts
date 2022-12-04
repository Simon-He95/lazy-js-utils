import child_process from 'child_process'
import { isArray } from './isArray'
import { isBool } from './isBool'
import { isStr } from './isStr'
import { IShellMessage } from './types'
export function jsShell<T extends string | string[]>(commander: T, errorExit?: boolean): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(commander: T, stdio: 'inherit' | 'pipe', errorExit?: boolean): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(commander: T, stdio: 'inherit' | 'pipe', errorExit?: boolean): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(commander: T, args: string[], stdio?: 'inherit' | 'pipe', errorExit?: boolean): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(commander: T, args: string[] | boolean | 'inherit' | 'pipe' = [], stdio: 'inherit' | 'pipe' | boolean = 'inherit', errorExit?: boolean) {
  if (isBool(args)) {
    errorExit = args as boolean
    args = []
    stdio = 'inherit'
  }
  else if (isStr(args)) {
    stdio = args as 'inherit' | 'pipe'
    args = []
  }
  return (isArray(commander)
    ? commander.map(command => executor(command))
    : executor(commander)) as T extends string ? IShellMessage : IShellMessage[]
  function executor(commander: string): IShellMessage {
    const { status, output } = child_process.spawnSync(commander, args as string[], {
      shell: true,
      encoding: 'utf8',
      stdio: stdio === 'inherit'
        ? 'inherit'
        : ['inherit', 'pipe', 'inherit'],
    })
    if (status === 130) {
      console.log('已取消...')
      process.exit(1)
    }
    const result = output[1]?.trim()
    if (status !== 0) {
      console.log(result)
      errorExit && process.exit(1)
    }

    return { status, result } as IShellMessage
  }
}


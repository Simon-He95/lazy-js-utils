import child_process from 'child_process'
import { isArray } from './isArray'
interface IShellMessage {
  status: number
  result: string
}
export function jsShell<T extends string | string[]>(commander: T, errorExit?: boolean): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(commander: T, stdio: 'inherit' | 'pipe', errorExit?: boolean): T extends string ? IShellMessage : IShellMessage[]
export function jsShell<T extends string | string[]>(commander: T, stdio: 'inherit' | 'pipe' | boolean = 'inherit', errorExit?: boolean) {
  return (isArray(commander)
    ? commander.map(command => executor(command))
    : executor(commander)) as T extends string ? IShellMessage : IShellMessage[]
  function executor(commander: string): IShellMessage {
    const { status, output } = child_process.spawnSync(commander, {
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


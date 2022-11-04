import child_process from 'child_process'
import { isArray } from './isArray'
interface IShellMessage {
  status: number
  result: string
}
export function jsShell<T extends string | string[]>(commander: T, errorExit?: boolean) {
  return (isArray(commander)
    ? commander.map(command => executor(command))
    : executor(commander)) as T extends string ? IShellMessage : IShellMessage[]
  function executor(commander: string): IShellMessage {
    const { status, output } = child_process.spawnSync(commander, {
      shell: true,
      stdio: ['inherit', 'pipe', 'inherit'],
      encoding: 'utf8',
    })
    if (status === 130) {
      console.log('已取消...')
      process.exit(1)
    }
    const result = output[1]
    if (status !== 0) {
      console.log(result)
      errorExit && process.exit(1)
    }
    return { status, result } as IShellMessage
  }
}


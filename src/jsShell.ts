import child_process from 'child_process'
import { isArray } from './isArray'
export function jsShell(commander: string | string[], errorExit?: boolean) {
  return isArray(commander)
    ? commander.map(command => executor(command))
    : executor(commander)
  function executor(commander: string) {
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
    return result
  }
}


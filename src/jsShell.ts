import child_process from 'child_process'
import { isArray } from './isArray'
export function jsShell(commander: string | string[]) {
  return isArray(commander)
    ? commander.map(command => executor(command))
    : executor(commander)
}
function executor(commander: string) {
  const { status, output } = child_process.spawnSync(commander, {
    shell: true,
    stdio: ['inherit', 'pipe', 'inherit'],
    encoding: 'utf8',
  })
  const result = output[1]
  if (status !== 0)
    console.log(result)
  return result
}

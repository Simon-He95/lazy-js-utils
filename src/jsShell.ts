import child_process from 'child_process'
export function jsShell(commander: string) {
  return child_process.spawnSync(commander, {
    shell: true,
    stdio: ['inherit', 'pipe', 'inherit'],
    encoding: 'utf8',
  }).output[1]
}

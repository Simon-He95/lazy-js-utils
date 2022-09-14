import child_process from 'child_process'
export function jsShell(commander: string) {
  const { status, output } = child_process.spawnSync(commander, {
    shell: true,
    stdio: ['inherit', 'pipe', 'inherit'],
    encoding: 'utf8',
  })
  const result = output[1]
  if (status === 0)
    return result
  else
    console.log(result)
  process.exit(status!)
}

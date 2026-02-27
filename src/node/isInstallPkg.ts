import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export async function isInstallPkg(pkg: string) {
  const command = pkg.trim().split(/\s+/)[0]
  if (!command)
    return false

  async function isExecutable(filePath: string) {
    try {
      const stat = await fsp.stat(filePath)
      if (!stat.isFile())
        return false
      if (process.platform === 'win32')
        return true
      await fsp.access(filePath, fs.constants.X_OK)
      return true
    }
    catch {
      return false
    }
  }

  const isWindows = process.platform === 'win32'
  const hasPathSeparator = command.includes('/') || command.includes('\\')
  const hasExt = Boolean(path.extname(command))
  const pathExts = isWindows
    ? (process.env.PATHEXT || '.COM;.EXE;.BAT;.CMD').split(';').filter(Boolean)
    : ['']
  const toCandidates = (base: string) =>
    isWindows && !hasExt ? pathExts.map(ext => `${base}${ext}`) : [base]

  if (path.isAbsolute(command) || hasPathSeparator) {
    for (const candidate of toCandidates(command)) {
      if (await isExecutable(candidate))
        return true
    }
    return false
  }

  const pathEntries = (process.env.PATH || '')
    .split(path.delimiter)
    .map(item => item.trim().replace(/^"+|"+$/g, ''))
    .filter(Boolean)

  for (const entry of pathEntries) {
    for (const candidate of toCandidates(path.join(entry, command))) {
      if (await isExecutable(candidate))
        return true
    }
  }
  return false
}

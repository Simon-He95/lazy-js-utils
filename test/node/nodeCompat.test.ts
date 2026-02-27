/**
 * @vitest-environment node
 */
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { fileCopy } from '../../src/node/fileCopy'
import { isGo } from '../../src/node/isGo'
import { isInstallPkg } from '../../src/node/isInstallPkg'
import { isPkg } from '../../src/node/isPkg'
import { isRust } from '../../src/node/isRust'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(
    tempDirs
      .splice(0)
      .map(dir => fsp.rm(dir, { recursive: true, force: true })),
  )
})

async function createTempDir() {
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'node-compat-'))
  tempDirs.push(dir)
  return dir
}

describe('node cross-platform helpers', () => {
  it('isPkg works for both directory and package.json path', async () => {
    const dir = await createTempDir()
    const pkgPath = path.join(dir, 'package.json')
    await fsp.writeFile(pkgPath, '{"name":"test"}')

    await expect(isPkg(dir)).resolves.toBe(true)
    await expect(isPkg(pkgPath)).resolves.toBe(true)
  })

  it('isPkg returns false when package.json does not exist', async () => {
    const dir = await createTempDir()
    await expect(isPkg(dir)).resolves.toBe(false)
  })

  it('isGo detects main.go and go.mod under the given rootPath', async () => {
    const dirWithMain = await createTempDir()
    await fsp.writeFile(path.join(dirWithMain, 'main.go'), 'package main')
    await expect(isGo(dirWithMain)).resolves.toBe(true)

    const dirWithMod = await createTempDir()
    await fsp.writeFile(path.join(dirWithMod, 'go.mod'), 'module example')
    await expect(isGo(dirWithMod)).resolves.toBe(true)

    const emptyDir = await createTempDir()
    await expect(isGo(emptyDir)).resolves.toBe(false)
  })

  it('isRust detects Cargo.toml under the given rootPath', async () => {
    const dir = await createTempDir()
    await fsp.writeFile(path.join(dir, 'Cargo.toml'), '[package]')
    await expect(isRust(dir)).resolves.toBe(true)

    const emptyDir = await createTempDir()
    await expect(isRust(emptyDir)).resolves.toBe(false)
  })

  it('isInstallPkg uses PATH lookup without shell-specific commands', async () => {
    await expect(isInstallPkg('node')).resolves.toBe(true)
    await expect(isInstallPkg('__definitely_not_a_real_pkg__')).resolves.toBe(
      false,
    )
  })

  it('fileCopy copies files and directories to destination', async () => {
    const sourceRoot = await createTempDir()
    const destination = await createTempDir()

    const sourceFile = path.join(sourceRoot, 'a.txt')
    const sourceDir = path.join(sourceRoot, 'nested')
    await fsp.writeFile(sourceFile, 'A')
    await fsp.mkdir(sourceDir)
    await fsp.writeFile(path.join(sourceDir, 'b.txt'), 'B')

    const result = await fileCopy([sourceFile, sourceDir], destination)
    expect(result.status).toBe(0)

    await expect(
      fsp.readFile(path.join(destination, 'a.txt'), 'utf-8'),
    ).resolves.toBe('A')
    await expect(
      fsp.readFile(path.join(destination, 'nested', 'b.txt'), 'utf-8'),
    ).resolves.toBe('B')
  })
})

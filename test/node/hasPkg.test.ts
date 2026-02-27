/**
 * @vitest-environment node
 */
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { hasPkg } from '../../src/node/hasPkg'

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(
    tempDirs
      .splice(0)
      .map(dir => fsp.rm(dir, { recursive: true, force: true })),
  )
})

async function createTempDir() {
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), 'has-pkg-'))
  tempDirs.push(dir)
  return dir
}

describe('hasPkg', () => {
  it('returns true when package.json exists', async () => {
    const dir = await createTempDir()
    await fsp.writeFile(path.join(dir, 'package.json'), '{"name":"test"}')
    await expect(hasPkg(dir)).resolves.toBe(true)
  })

  it('returns false when package.json does not exist', async () => {
    const dir = await createTempDir()
    await expect(hasPkg(dir)).resolves.toBe(false)
  })
})

import process from 'node:process'
import path from 'node:path'
import fsp from 'node:fs/promises'

/**
 * 判断是否是rust环境
 * @description EN: Detect whether the current project is a Rust project by checking for Cargo.toml.
 */
export async function isRust(rootPath = process.cwd()) {
  const url = path.resolve(rootPath, 'Cargo.toml')
  try {
    return (await fsp.stat(url)).isFile()
  }
  catch {
    return false
  }
}

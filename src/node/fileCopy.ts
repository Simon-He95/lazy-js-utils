import fsp from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import type { IShellMessage } from '../types'

/**
 * 将文件拷贝到另一个目录
 * @param urls 需要被拷贝的文件路径
 * @param destination 目录
 * @returns IShellMessage
 * @description EN: Copy given files to a destination directory via a shell command wrapper.
 */
export async function fileCopy(
  urls: string[],
  destination: string,
): Promise<IShellMessage> {
  try {
    await fsp.mkdir(destination, { recursive: true })
    await Promise.all(
      urls.map(async (url) => {
        const target = path.join(destination, path.basename(url))
        await fsp.cp(url, target, { recursive: true, force: true })
      }),
    )
    return {
      status: 0,
      result: '',
      pid: process.pid,
    }
  }
  catch (error) {
    return {
      status: 1,
      result: error instanceof Error ? error.message : String(error),
      pid: process.pid,
    }
  }
}

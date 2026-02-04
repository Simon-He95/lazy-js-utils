import type { ChunkDetail, FileSpliceOptions } from '../types'

/**
 *
 * @param { File } _file 文件
 * @param { number } _chunkSize 切分大小 默认 1024 * 100
 * @returns
 * @description EN: Split a large `File` into chunks for parallel processing using web workers and return chunk details.
 */
export async function fileSplice(
  options: FileSpliceOptions,
): Promise<ChunkDetail[]> {
  return new Promise((resolve) => {
    const { file, chunkSize = 5 * 1024 * 1024, callback, workerUrl } = options
    const chunkCount = Math.ceil(file.size / chunkSize)
    if (chunkCount === 0)
      return resolve([])
    const threadCount = Math.min(navigator.hardwareConcurrency || 4, chunkCount)
    const baseCount = Math.floor(chunkCount / threadCount)
    const extra = chunkCount % threadCount
    const result: ChunkDetail[] = []
    let finishCount = 0
    const resolvedWorkerUrl
      = workerUrl ?? new URL('../worker/fileSpliceWorker.js', import.meta.url)
    for (let i = 0; i < threadCount; i++) {
      const worker = new Worker(resolvedWorkerUrl, {
        type: 'module',
      })
      const startIndex = i * baseCount + Math.min(i, extra)
      const count = baseCount + (i < extra ? 1 : 0)
      const endIndex = startIndex + count
      worker.postMessage({ file, i, chunkSize, startIndex, endIndex })
      worker.onmessage = ({ data }) => {
        finishCount++
        const params: ChunkDetail = {
          ...data,
          fileName: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          isDone: finishCount === threadCount,
          remaining: threadCount - finishCount,
        }
        result.push(params)
        callback && callback(params)
        worker.terminate()
        if (finishCount === threadCount)
          resolve(result)
      }
    }
  })
}

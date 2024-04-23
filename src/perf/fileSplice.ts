import type { ChunkDetail, FileSpliceOptions } from '../types'

/**
 *
 * @param { File } _file 文件
 * @param { number } _chunkSize 切分大小 默认 1024 * 100
 * @returns
 */
export async function fileSplice(
  options: FileSpliceOptions,
): Promise<ChunkDetail[]> {
  return new Promise((resolve) => {
    const { file, chunkSize = 5 * 1024 * 1024, callback } = options || {}
    const THREAD_COUNT = navigator.hardwareConcurrency || 4
    const result: ChunkDetail[] = []

    const chunkCount = Math.ceil(file.size / chunkSize)
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
    let finishCount = 0
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker('./dist/worker/fileSpliceWorker.js', {
        type: 'module',
      })
      const startIndex = i * workerChunkCount
      let endIndex = startIndex + workerChunkCount
      if (endIndex > chunkCount)
        endIndex = chunkCount
      worker.postMessage({ file, i, chunkSize, startIndex, endIndex })
      worker.onmessage = ({ data }) => {
        finishCount++
        const params: ChunkDetail = {
          ...data,
          fileName: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          isDone: finishCount === THREAD_COUNT,
          remaining: THREAD_COUNT - finishCount,
        }
        result.push(params)
        callback && callback(params)
        worker.terminate()
        if (finishCount === THREAD_COUNT)
          resolve(result)
      }
    }
  })
}

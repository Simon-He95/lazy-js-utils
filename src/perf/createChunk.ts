import SparkMD5 from 'spark-md5'
import type { ChunkInfo } from '../types'

const hashMap = new Map()
/**
 * 创建并计算文件分片的哈希信息
 * @param { File } file 要分片的文件
 * @param { number } index 分片索引
 * @param { number } chunkSize 分片大小
 * @returns { Promise<ChunkInfo> } 分片信息（start/end/index/hash）
 * @description EN: Create a file chunk and compute its MD5 hash using ArrayBuffer; returns chunk metadata.
 */
export function createChunk(
  file: File,
  index: number,
  chunkSize: number,
): Promise<ChunkInfo> {
  return new Promise((resolve) => {
    const start = index * chunkSize
    const end = start + chunkSize
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const fileBuffer = e.target?.result as ArrayBuffer
      let hash
      if (!hashMap.has(fileBuffer)) {
        spark.append(fileBuffer)
        hash = spark.end()
      }
      else {
        hash = hashMap.get(fileBuffer)
      }

      resolve({
        start,
        end,
        index,
        hash,
      })
    }
    fileReader.readAsArrayBuffer(file.slice(start, end))
  })
}

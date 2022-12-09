import SparkMD5 from 'spark-md5'
import type { FileChunk, FileMD5 } from '../types'

export async function fileSplice(
  _file: File,
  _chunkSize: number = 1024 * 100,
): Promise<FileChunk[]> {
  const { HASH, suffix } = await getMD5()
  const chunks: FileChunk[] = []
  // 实现切片处理 [固定切片大小 & 数量]
  let max = _chunkSize // 100kb
  let count = Math.ceil(_file.size / max)
  let index = 0

  if (count > 100) {
    // 如果切片的数量大于100,可以固定切片的数量为100,来调整每一个切片的大小
    count = 100
    max = _file.size / count
  }
  while (index < count) {
    chunks.push({
      file: _file.slice(index * max, (index + 1) * max), // 一:0 ~ max;二:max ~ 2 * max ...
      filename: `${HASH}_${index + 1}.${suffix}`,
    })
    index++
  }
  return chunks
  function getMD5(): Promise<FileMD5> {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(_file)
    return new Promise((resolve, reject) => {
      try {
        fileReader.onload = function (e: any) {
          const buffer = e?.target.result
          const // buffer编码
            spark = new SparkMD5.ArrayBuffer()
          spark.append(buffer)
          const HASH = spark.end()
          const suffix = /\.([a-zA-Z0-9]+)$/.exec(_file.name)![1]
          const filename = `${HASH}.${suffix}`
          resolve({
            HASH,
            suffix,
            filename,
            buffer,
          })
        }
      }
      catch (error: any) {
        reject(new Error(error))
      }
    })
  }
}

import { createChunk } from '../perf/createChunk'

onmessage = async (e) => {
  const { file, chunkSize, startIndex, endIndex } = e.data
  for (let i = startIndex; i < endIndex; i++)
    createChunk(file, i, chunkSize).then(postMessage)
}

import { Worker, parentPort } from 'worker_threads'
import { fileURLToPath } from 'url'
import path from 'path'

export function useNodeWorker(relativePath: string, data: any) {
  return new Promise((resolve) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const url = path.resolve(__dirname, relativePath)
    const seprateThread = new Worker(url)
    seprateThread.on('message', resolve)
    seprateThread.postMessage(data)
  })
}

export function useProcressNodeWorker(callback: (data: any) => any) {
  parentPort!.on('message', async data =>
    parentPort?.postMessage(callback?.(data)))
}

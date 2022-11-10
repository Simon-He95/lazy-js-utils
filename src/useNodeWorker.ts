import { Worker, parentPort } from 'worker_threads'

export function useNodeWorker(url: string, data: any) {
  return new Promise((resolve) => {
    const seprateThread = new Worker(url)
    seprateThread.on('message', resolve)
    seprateThread.postMessage(data)
  })
}

export function useProcressNodeWorker(callback: (data: any) => any) {
  parentPort!.on('message', async data =>
    parentPort?.postMessage(callback?.(data)))
}

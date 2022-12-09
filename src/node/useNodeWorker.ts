import worker_threads from 'worker_threads'
export function useNodeWorker(url: string, data: any) {
  const { Worker } = worker_threads
  return new Promise((resolve) => {
    const seprateThread = new Worker(url)
    seprateThread.on('message', resolve)
    seprateThread.postMessage(data)
  })
}

export function useProcressNodeWorker(callback: (data: any) => any) {
  const { parentPort } = worker_threads
  parentPort!.on('message', async data =>
    parentPort?.postMessage((await callback?.(data)) || (() => '')),
  )
}

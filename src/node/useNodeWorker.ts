import worker_threads from 'worker_threads'
import path from 'path'
import { isArray } from '../is/isArray'
import { isStr } from '../is/isStr'
import type { IShellMessage, NodeWorkerPayload } from '../types'

type NodeWorkReturn<T> = T extends NodeWorkerPayload
  ? IShellMessage[]
  : IShellMessage

export async function useNodeWorker<T extends NodeWorkerPayload | string>(
  payload: T,
  url?: string,
): Promise<NodeWorkReturn<T>> {
  url = url || path.resolve(__dirname, './node/useNodeWorkerThread.js')
  const { params, stdio } = isStr(payload)
    ? { params: payload, stdio: 'pipe' }
    : payload
  const commands = isArray(params) ? params : params.split('&&')
  const result = await Promise.all(
    commands.map(params =>
      createWorker({
        params,
        stdio: stdio as 'pipe' | 'inherit',
      }),
    ),
  )
  setTimeout(process.exit) // 结束子进程
  return (result.length === 1 ? result[0] : result) as NodeWorkReturn<T>

  function createWorker(payload: NodeWorkerPayload) {
    const { Worker } = worker_threads
    return new Promise((resolve) => {
      const seprateThread = new Worker(url!)
      seprateThread.on('message', resolve)
      seprateThread.postMessage(payload)
    })
  }
}

export function useProcressNodeWorker(callback: (data: any) => any) {
  const { parentPort } = worker_threads
  parentPort!.on('message', async data =>
    parentPort?.postMessage((await callback?.(data)) || (() => '')),
  )
}

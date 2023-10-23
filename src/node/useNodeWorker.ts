import worker_threads from 'node:worker_threads'
import path from 'node:path'
import process from 'node:process'
import { isArray } from '../is/isArray'
import { isStr } from '../is/isStr'
import { parallel } from '../js/parallel'
import type { IShellMessage, NodeWorkerPayload } from '../types'
import { isWin } from '../is'

type NodeWorkReturn<T> = T extends {
  params: string[]
  stdio?: 'inherit' | 'pipe'
}
  ? IShellMessage[]
  : IShellMessage

/**
 * 这个api需要 dependencies 中安装lazy-js-utils
 * @param { string | NodeWorkerPayload } payload 字符串 ｜ {
  params: string[]
  stdio?: 'inherit' | 'pipe'
}
 * @param { string } [url] 自定义worker路径
 * @returns
 */
export async function useNodeWorker<T extends NodeWorkerPayload | string>(
  payload: T,
  url?: string,
): Promise<NodeWorkReturn<T>> {
  // const dev = './useNodeWorkerThread.ts'
  let prd1 = '../node_modules/lazy-js-utils/dist/worker/useNodeWorkerThread.cjs'
  let prd2 = './worker/useNodeWorkerThread.cjs'
  if (isWin()) {
    prd1 = prd1.replaceAll('/', '\\')
    prd2 = prd2.replaceAll('/', '\\')
  }
  url = url || path.resolve(__dirname, prd2)
  if (!url.includes('node_modules')) url = path.resolve(__dirname, prd1)

  const { params } = isStr(payload)
    ? (payload = { params: payload } as any)
    : payload
  const commands = isArray(params) ? params : params.split('&&')
  const result = await parallel(commands, (params) =>
    createWorker(
      Object.assign(payload, {
        params,
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
  parentPort!.on('message', async (data) =>
    parentPort?.postMessage((await callback?.(data)) || (() => '')),
  )
}

// useNodeWorker({
//   params: 'echo "hi" && echo "hello"',
//   stdio: 'inherit',
//   errorExit: true,
// },
// './src/node/useNodeWorkerThread.ts',
// )

// useNodeWorker('gum choose "1" "2"',
//   './src/node/useNodeWorkerThread.ts',
// )

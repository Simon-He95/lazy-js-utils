import worker_threads from 'node:worker_threads'
import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import { isArray } from '../is/isArray'
import { isStr } from '../is/isStr'
import { parallel } from '../js/parallel'
import type { IShellMessage, NodeWorkerPayload } from '../types'

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
  if (!url) {
    url = path.resolve(
      __dirname,
      '../node_modules/lazy-js-utils/dist/worker/useNodeWorkerThread.mjs',
    )
    if (!fs.existsSync(url))
      url = path.resolve(__dirname, '../worker/useNodeWorkerThread.mjs')
  }
  const { params } = isStr(payload)
    ? (payload = { params: payload } as any)
    : payload
  const commands = isArray(params) ? params : params.split('&&')
  const result = await parallel(commands, params =>
    createWorker(
      Object.assign(payload, {
        params,
      }),
    ))
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
    parentPort?.postMessage((await callback?.(data)) || (() => '')))
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

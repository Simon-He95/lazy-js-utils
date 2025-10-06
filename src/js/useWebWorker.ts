/**
 * webWorker
 * @param { string } [url] url自定义worker文件路径 或者 worker函数
 * @description EN: Create a simple WebWorker wrapper. Accepts a script URL or a function which will be converted to a URL. Returns helpers to post messages and register handlers.
 */
import { fnToUrl } from './fnToUrl'

export function useWebWorker(url: string | (() => void)) {
  // Handler placeholders
  let onMessage: ((d: any) => void) | undefined
  let errorMessage: ((err: any) => void) | undefined

  // Create or reuse a Worker from URL or function
  const workerUrl = typeof url === 'function' ? fnToUrl(url) : url
  const worker = new Worker(workerUrl)

  const on = (callback: (data: any) => void) => (onMessage = callback)
  const error = (err: (err: any) => void) => (errorMessage = err)

  worker.onerror = (e: any) => errorMessage?.(e)
  worker.onmessage = (event: MessageEvent) => onMessage?.(event.data)

  return {
    emit: (msg: any) => worker.postMessage(msg),
    on,
    error,
    terminate: () => worker.terminate(),
  }
}

// const { emit, on, error } = useWebWorker(() => {
//   self.onmessage = (e) => {
//     const userNum = Number(e.data)

//     fibonacci(userNum)
//   }

//   function fibonacci(num: number) {
//     let a = 1
//     let b = 0
//     while (num >= 0) {
//       [a, b] = [a + b, a]
//       num--
//     }

//     self.postMessage('nihao')
//   }
// })
// on((data) => {
//   console.log('on...', data)
// })
// emit('hi')
// error((err) => {
//   console.log(err)
// })

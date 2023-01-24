import { isStr } from '../is/isStr'

/**
 *
 * @param { string } [url] url自定义worker文件路径
 * @param { Function } [workerFunc] worker函数
 */
export function useWebWorker(url: string): any
export function useWebWorker(useWebWorkerThread: () => void): any
export function useWebWorker(url: string | (() => void)) {
  const worker = new Worker(isStr(url) ? url : fn2workerURL(url))
  let onMessage: any
  let errorMessage: any
  const on = (callback: (data: any) => void) => (onMessage = callback)
  const error = (err: (err: any) => void) => (errorMessage = err)
  worker.onerror = error => errorMessage?.(error)
  worker.onmessage = event => onMessage?.(event.data)
  return {
    emit: (msg: any) => worker.postMessage(msg),
    on,
    error,
  }
}

function fn2workerURL(fn: Function) {
  const blob = new Blob([`(${fn.toString()})()`], { type: 'text/javascript' })
  return URL.createObjectURL(blob)
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

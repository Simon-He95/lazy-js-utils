import { isStr } from '../is/isStr'
import { fnToUrl } from './fnToUrl'

/**
 * 注册 Service Worker
 * @description EN: Register a ServiceWorker from a script URL or an inline function that is transformed into a blob URL.
 * @param { string | (() => void) } url Service Worker 脚本地址，或一个将在 Worker 中执行的函数
 * @param { RegistrationOptions } options Service Worker 注册配置项
 * @returns { Promise<ServiceWorkerRegistration> }
 */
export function useServiceWorker(
  url: string | (() => void),
  options: RegistrationOptions,
) {
  if (!('serviceWorker' in navigator))
    return Promise.reject(new Error('ServiceWorker not support'))

  return navigator.serviceWorker.register(
    isStr(url) ? url : fnToUrl(url),
    options,
  )
}

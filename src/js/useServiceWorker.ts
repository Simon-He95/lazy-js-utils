import { isStr } from '../is/isStr'
import { fnToUrl } from './fnToUrl'

/**
 *
 * @param url url自定义worker文件路径 或者 worker函数
 * @param { RegistrationOptions } options {
 *  scope?: string;
 *  type?: WorkerType;
 *  updateViaCache?: ServiceWorkerUpdateViaCache;
 *  }
 * @returns
 * @description EN: Register a ServiceWorker from a URL or an inline function converted to a blob URL.
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

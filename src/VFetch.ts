import type { IFetchConfig, IFetchOptions, ResponseType } from './types'
import { deepMerge } from './deepMerge'
import { stringify } from './stringify'

const cancelMap = new Map()

export class VFetch {
  config: IFetchConfig
  constructor(baseOptions?: IFetchOptions) {
    const { baseURL = '', headers = {}, timeout = 20 * 1000, interceptors } = baseOptions || {}
    this.config = {
      baseURL,
      headers,
      timeout,
      interceptors,
    } as IFetchConfig
  }

  init(this: VFetch, options: IFetchConfig) {
    const {
      url,
      method = 'GET',
      headers = {},
      bodyType = 'json',
      params = {},
      credentials = 'omit',
      integrity,
      referrerPolicy = 'no-referrer-when-downgrade',
      referrer = '',
      responseType = 'json',
      keepalive = false,
      timeout,
      transformResponse,
      cache = 'default',
      redirect = 'manual',
      mode = 'cors',
    } = options
    this.config = Object.assign(this.config, {
      url: url?.startsWith('http')
        ? url
        : (this.config.baseURL || '') + (url || ''),
      method,
      bodyType,
      credentials,
      responseType,
      timeout: timeout || this.config.timeout,
      transformResponse,
      cache,
      redirect,
      mode,
      body: params,
      keepalive,
      integrity,
      referrerPolicy,
      referrer,
      headers: Object.assign({
        'Content-Type': 'application/json',

      }, this.config.headers, headers),
    })

    if (this.config.method === 'GET') {
      if (Object.keys(params).length)
        this.config.url += `?${stringify(params)}`
      this.config.body = undefined
    }
    return this.request()
  }

  request(this: VFetch) {
    const controller = new AbortController()
    const signal = controller.signal
    this.config.signal = signal
    this.config.cancel = () => controller.abort()
    const { body, method, bodyType, url, timeout, responseType, transformResponse } = this.config
    if (body && method !== 'GET') {
      if (bodyType === 'form') {
        deepMerge(this.config.headers!, { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' })
        this.config.body = stringify(body)
      }
      else if (bodyType === 'file') {
        deepMerge(this.config.headers!, { 'Content-Type': 'multipart/form-data' })
        this.config.body = Object.keys(body).reduce((result, key) => {
          result.append(key, body[key])
          return result
        }, new FormData())
      }
      else if (bodyType === 'json') {
        this.config.body = JSON.stringify(body)
      }
    }
    const key = generateKey(this.config)
    if (cancelMap.has(key))
      cancelMap.get(key)?.()
    cancelMap.set(key, this.config.cancel)

    return Promise.race([
      fetch(url, this.config?.interceptors?.request?.success?.(this.config) || this.config),
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Response('timeout', { status: 504, statusText: 'timeout ' }))
          controller.abort()
        }, timeout || 20 * 1000)
      }),
    ]).then(
      (response: any) => {
        if (response.status === 200) {
          return transformResponse
            ? transformResponse(response)
            : response
        }
        return this.config?.interceptors?.response?.error?.(response) || Promise.reject(response)
      },
      (err) => {
        return this.config?.interceptors?.request?.error?.(err) || Promise.reject(err)
      },
    ).then(
      async (response: Response) => {
        try {
          const data = this.getResponseData(response, responseType)
          const result = await data
          cancelMap.delete(generateKey(this.config))
          return this.config?.interceptors?.response?.success?.(result) || result
        }
        catch (error) {
          cancelMap.delete(generateKey(this.config))
          return this.config?.interceptors?.response?.error?.(error)
            || Promise.reject(error)
        }
      },
    )
  }

  getResponseData(response: Response, responseType?: ResponseType) {
    if (responseType === 'json')
      return response?.json()
    else if (responseType === 'text')
      return response?.text()
    else if (responseType === 'blob')
      return response?.blob()
    else if (responseType === 'formData')
      return response?.formData()
    else if (responseType === 'arrayBuffer')
      return response?.arrayBuffer()
  }

  get(this: VFetch, options: IFetchConfig): Promise<any> {
    return new VFetch(this.config).init(Object.assign(options, {
      method: 'GET',
    }))
  }

  post(this: VFetch, options: IFetchConfig): Promise<any> {
    return new VFetch(this.config).init(Object.assign(options, {
      method: 'post',
    }))
  }

  put(this: VFetch, options: IFetchConfig): Promise<any> {
    return new VFetch(this.config).init(Object.assign(options, {
      method: 'put',
    }))
  }

  delete(this: VFetch, options: IFetchConfig): Promise<any> {
    return new VFetch(this.config).init(Object.assign(options, {
      method: 'delete',
    }))
  }
}

function generateKey(config: Record<string, any>) {
  const { url, method, params, data } = config
  return `${url}-${method}-${JSON.stringify(method === 'get' ? params : data)}`
}


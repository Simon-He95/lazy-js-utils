import type { IFetchOptions, VFetch, VFetchConfig } from './types'
import { deepMerge } from './deepMerge'
import { stringify } from './stringify'

export function vFetch(this: any, options: VFetchConfig): any {
  if (this === undefined)
    return vFetch.create({})(options)

  const { url, method = 'GET', headers = {}, bodyType = 'json', params = {}, credentials = 'omit', responseType = 'json', timeout, transformResponse, cache = 'default', redirect = 'manual', mode = 'cors' } = options
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
    headers: Object.assign({
      'Content-Type': 'application/json',

    }, this.config.headers, headers),
  })
  if (this.config.method === 'GET') {
    if (Object.keys(params).length)
      this.config.url += `?${stringify(params)}`
    this.config.body = undefined
  }

  this.result = this.request()
  return this
}

vFetch.request = function request(this: any) {
  const { body, method, bodyType, url, timeout, responseType, transformResponse } = this.config
  if (body && method !== 'GET') {
    if (bodyType === 'form') {
      deepMerge(this.config.headers, { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' })
      this.config.body = stringify(body)
    }
    else if (bodyType === 'file') {
      deepMerge(this.config.headers, { 'Content-Type': 'multipart/form-data' })
      this.config.body = Object.keys(body).reduce((result, key) => {
        result.append(key, body[key])
        return result
      }, new FormData())
    }
    else if (bodyType === 'json') {
      this.config.body = JSON.stringify(body)
    }
  }
  return Promise.race([
    fetch(url, this.interceptors.request.success(this.config)),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), timeout || 20 * 1000)
    }),
  ]).then(
    (response: any) => {
      if (response.status === 200) {
        return transformResponse
          ? transformResponse(this.interceptors.response.success(response))
          : this.interceptors.response.success(response)
      }
      return this.interceptors.response.error(response)
    },
    (err) => {
      return this.interceptors.request.error(err)
    },
  ).then(
    (response: Response) => {
      if (responseType === 'json')
        return response.json()
      else if (responseType === 'text')
        return response.text()
      else if (responseType === 'blob')
        return response.blob()
      else if (responseType === 'formData')
        return response.formData()
      else if (responseType === 'arrayBuffer')
        return response.arrayBuffer()
    },
  )
}

vFetch.then = async function then(this: any, successCallback: (res: any) => void, errorCallback?: (err: any) => void) {
  try {
    const result = await this.result
    successCallback(this.interceptors.response.success(result))
  }
  catch (error) {
    this.interceptors.response.error(error)
    if (errorCallback)
      errorCallback(error)
  }
}

vFetch.create = function create(this: any, baseOptions: IFetchOptions) {
  const { baseURL = '', headers = {}, timeout = 20 * 1000 } = baseOptions
  this.config = {
    baseURL,
    headers,
    timeout,
  }
  return (options: any) => vFetch.call(this, options)
}

vFetch.get = function get(this: any, options: VFetchConfig) {
  return vFetch.call(this, Object.assign(options, { method: 'GET' }))
}

vFetch.post = function post(this: any, options: VFetchConfig) {
  return vFetch.call(this, Object.assign(options, { method: 'POST' }))
}

vFetch.put = function put(this: any, options: VFetchConfig) {
  return vFetch.call(this, Object.assign(options, { method: 'PUT' }))
}

vFetch.DELETE = function DELETE(this: any, options: VFetchConfig) {
  return vFetch.call(this, Object.assign(options, { method: 'DELETE' }))
}

vFetch.interceptors = {
  request: {
    use(successCallback?: (response: Response) => Response, errorCallback?: (error: any) => Promise<never>) {
      if (successCallback)
        vFetch.interceptors.request.success = successCallback
      if (errorCallback)
        vFetch.interceptors.request.error = errorCallback
    },
    success(this: VFetch, response: Response) {
      return response
    },
    error(this: VFetch, error: any) {
      return Promise.reject(error)
    },
  },
  response: {
    use(successCallback?: (response: Response) => Response, errorCallback?: (error: any) => Promise<never>) {
      if (successCallback)
        vFetch.interceptors.request.success = successCallback
      if (errorCallback)
        vFetch.interceptors.request.error = errorCallback
    },
    success: function success(this: VFetch, response: Response) {
      return response
    },
    error: function error(this: VFetch, error: Error) {
      return Promise.reject(error)
    },
  },
}

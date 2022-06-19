import type { IFetchOptions, VFetch, VFetchConfig } from './types'

export function vFetch(this: any, options: VFetchConfig): any {
  if (this === undefined)
    return vFetch.create({})(options)

  const { url, method, headers, bodyType, params, credentials, responseType, timeout, transformResponse, cache, redirect, mode } = options
  this.config = Object.assign(this.config, {
    url: url?.startsWith('http')
      ? url
      : (this.config.baseURL || '') + (url || ''),
    method: method || this.config.method || 'GET',
    bodyType: bodyType || 'json',
    credentials: credentials || 'omit',
    responseType: responseType || 'json',
    timeout: timeout || this.config.timeout,
    transformResponse,
    cache: cache || 'default',
    redirect: redirect || 'manual',
    mode: mode || 'cors',
    body: {},
    headers: Object.assign({
      'Content-Type': 'application/json',
      set(this: any, key: string, value: any): void {
        this[key] = value
      },
      has(key: string): boolean {
        return this.hasOwnProperty(key)
      },
    }, this.config.headers),
  })
  if (headers)
    this.set('headers', headers)
  if (params) {
    this.set('body', params)
    this.config.url += `?${this.bodyToString}`
  }
  if (this.config.method === 'GET')
    this.config.body = undefined

  this.result = this.request()
  return this
}

vFetch.set = function set(this: any, target: keyof VFetch, value: Record<string, string> = {}) {
  Object.keys(value).forEach((key) => {
    this.config[target][key] = value[key]
  })
}

vFetch.bodyToString = function bodyToString(this: VFetch) {
  return Object.keys(this.config.body!).reduce((result, key) => result += `${key}=${encodeURI(this.config.body![key])}&`, '')
}

vFetch.request = function request(this: any) {
  if (this.body && this.method !== 'GET') {
    if (this.bodyType === 'form') {
      this.set('headers', { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' })
      this.body = this.bodyToString()
    }
    else if (this.bodyType === 'file') {
      this.set('headers', { 'Content-Type': 'multipart/form-data' })
      this.body = Object.keys(this.body!).reduce((result, key) => {
        result.append(key, this.body![key])
        return result
      }, new FormData())
    }
    else if (this.bodyType === 'json') {
      this.body = JSON.stringify(this.body)
    }
  }
  return Promise.race([
    fetch(this.config.url, this.interceptors.request.success(this.config)),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), this.timeout ? this.timeout : 30 * 1000)
    }),
  ]).then(
    (response: any) => {
      if (response.status === 200) {
        return this.transformResponse
          ? this.transformResponse(this.interceptors.response.success(response))
          : this.interceptors.response.success(response)
      }
      return this.interceptors.response.error(response)
    },
    (err) => {
      return this.interceptors.request.error(err)
    },
  ).then(
    (response: Response) => {
      if (this.responseType === 'json')
        return response.json()
      else if (this.responseType === 'text')
        return response.text()
      else if (this.responseType === 'blob')
        return response.blob()
      else if (this.responseType === 'formData')
        return response.formData()
      else if (this.responseType === 'arrayBuffer')
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

vFetch.create = function create(this: any, options: IFetchOptions) {
  const { baseURL, headers, timeout } = options
  this.config = {
    baseURL: baseURL || '',
    headers: headers || {},
    timeout: timeout || 20 * 1000,
  }

  if (headers)
    this.set('headers', headers)
  return (options: any) => vFetch.call(this, options)
}

vFetch.get = function get(this: any, options: VFetchConfig) {
  this.method = 'GET'
  return vFetch.call(this, options)
}

vFetch.post = function post(this: any, options: VFetchConfig) {
  this.method = 'POST'
  return vFetch.call(this, options)
}

vFetch.put = function put(this: any, options: VFetchConfig) {
  this.method = 'PUT'
  return vFetch.call(this, options)
}

vFetch.DELETE = function DELETE(this: any, options: VFetchConfig) {
  this.method = 'DELETE'
  return vFetch.call(this, options)
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

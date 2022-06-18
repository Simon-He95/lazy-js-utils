import type { IFetchOptions, VFetch } from './types'

export function vFetch(this: any, options: VFetch) {
  const { url, method, headers, bodyType, params, credentials, responseType, timeout, transformResponse, cache, redirect, mode } = options
  if (url?.startsWith('http'))
    this.url = url
  else
    this.url = (this.baseURL || '') + (url || '')
  this.method = method || this.method || 'GET'
  this.bodyType = bodyType || 'json'
  this.credentials = credentials || 'omit'
  this.responseType = responseType || 'json'
  this.timeout = timeout || this.timeout
  this.transformResponse = transformResponse
  this.cache = cache || 'default'
  this.redirect = redirect || 'manual'
  this.mode = mode || 'cors'
  this.headers = {
    'Content-Type': 'application/json',
  }
  this.body = {}
  if (headers)
    this.set('headers', headers)
  if (params) {
    this.set('body', params)
    this.url += `?${this.bodyToString}`
  }
  if (this.method === 'GET')
    this.body = undefined

  this.result = this.request()
  return this
}

vFetch.set = function set(this: any, target: keyof VFetch, value: Record<string, string> = {}) {
  Object.keys(value).forEach((key) => {
    this[target][key] = value[key]
  })
}

vFetch.bodyToString = function bodyToString(this: VFetch) {
  return Object.keys(this.body!).reduce((result, key) => result += `${key}=${encodeURI(this.body![key])}&`, '')
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
    fetch(this.url, this),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), this.timeout ? this.timeout : 30 * 1000)
    }),
  ]).then(
    (response: any) => {
      if (response.status === 200) {
        return this.transformResponse
          ? this.transformResponse(this.interceptors.request.success(response))
          : this.interceptors.request.success(response)
      }
      return this.interceptors.request.error(response)
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
  ).catch((err) => {
    this.interceptors.request.error(err)
  })
}

vFetch.then = async function then(this: any, successCallback: (res: any) => void, errorCallback?: (err: any) => Promise<void>) {
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
  this.baseURL = baseURL || ''
  this.headers = headers || {}
  this.timeout = timeout || 20 * 1000
  if (headers)
    this.set('headers', headers)
  return (options: any) => vFetch.call(this, options)
}

vFetch.get = function get(this: any, options: VFetch) {
  this.method = 'GET'
  return vFetch.call(this, options)
}

vFetch.post = function post(this: any, options: VFetch) {
  this.method = 'POST'
  return vFetch.call(this, options)
}

vFetch.put = function put(this: any, options: VFetch) {
  this.method = 'PUT'
  return vFetch.call(this, options)
}

vFetch.DELETE = function DELETE(this: any, options: VFetch) {
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

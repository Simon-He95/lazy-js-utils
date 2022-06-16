import type { BodyType, Cache, Credentials, IFetch, Method, Mode, Redirect, ReturnType } from './types'
export class VFetch {
  url: string
  method: Method = 'GET'
  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  credentials: Credentials = 'include'
  body: any
  timeout = 0
  returnType: ReturnType = 'json'
  bodyType: BodyType = 'json'
  firstThen?: (response: Response) => Response
  result: Promise<any>
  cache: Cache = 'default'
  redirect: Redirect = 'manual'
  mode: Mode = 'cors'
  constructor(options: IFetch) {
    const { url, method, headers, bodyType, params, credentials, returnType, timeout, firstThen, cache, redirect, mode } = options
    this.url = url
    this.method = method || this.method
    this.headers = headers || this.headers
    this.bodyType = bodyType || this.bodyType
    this.credentials = credentials || this.credentials
    this.returnType = returnType || this.returnType
    this.timeout = timeout || this.timeout
    this.firstThen = firstThen || this.firstThen
    this.cache = cache || this.cache
    this.redirect = redirect || this.redirect
    this.mode = mode || this.mode
    if (headers)
      this.set('headers', headers)
    if (params) {
      this.set('body', params)
      this.url += `?${this.bodyToString}`
    }

    this.result = this.fetch()
  }

  set(target: keyof VFetch, value: Record<string, string> = {}) {
    Object.keys(value).forEach((key) => {
      this[target][key] = value[key]
    })
  }

  async then(successCallback: Function, errorCallback: Function) {
    try {
      const result = await this.result
      successCallback(result)
    }
    catch (error) {
      errorCallback(error)
    }
  }

  get bodyToString() {
    return Object.keys(this.body!).reduce((result, key) => result += `${key}=${encodeURI(this.body![key])}&`, '')
  }

  fetch() {
    if (this.body && this.method !== 'GET') {
      if (this.bodyType === 'form') {
        this.set('headers', { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' })
        this.body = this.bodyToString
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
      (response: any) => this.firstThen
        ? this.firstThen(response)
        : response,
    ).then(
      (response: Response) => {
        if (this.returnType === 'json')
          return response.json()
        else if (this.returnType === 'text')
          return response.text()
        else if (this.returnType === 'blob')
          return response.blob()
        else if (this.returnType === 'formData')
          return response.formData()
        else if (this.returnType === 'arrayBuffer')
          return response.arrayBuffer()
      },
    )
  }
}

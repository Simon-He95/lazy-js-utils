export type Redirect = 'follow' | 'error' | 'manual'
export type Cache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache'
export type Mode = 'cors' | 'no-cors' | 'same-origin' | 'navigate'
export type ResponseType = 'formData' | 'text' | 'blob' | 'arrayBuffer' | 'json'
export type BodyType = 'form' | 'json' | 'file'
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
export type Credentials = 'omit' | 'include' | 'same-origin'

export interface VFetch {
  config: VFetchConfig
  result?: Promise<any>
  request?: () => Promise<Response>
  then?: (resolve: (value: any) => void, reject: (reason: any) => void) => Promise<void>
  create?: (options: IFetchOptions) => (options: VFetch) => VFetch
  interceptors?: {
    request: {
      use: (successCallback?: ((response: Response) => Response), errorCallback?: ((error: any) => Promise<never>)) => void
      success: (response: Response) => Response
      error: (error: any) => void
    }
    response: {
      use: (successCallback?: ((response: Response) => Response), errorCallback?: ((error: any) => Promise<never>)) => void
      success: (response: Response) => Response
      error: (error: any) => void
    }
  }
}

export interface VFetchConfig {
  url: string
  baseURL?: string
  body?: any
  method?: Method
  headers?: Record<string, any>
  credentials?: Credentials
  params?: Record<string, string>
  timeout?: number
  responseType?: ResponseType
  bodyType?: BodyType
  cache?: Cache
  redirect?: Redirect
  mode?: Mode
  transformResponse?: (response: Response) => Response
}

export interface IFetchOptions {
  baseURL?: string
  timeout?: number
  headers?: Record<string, any>
}

export interface DeviceType { os: string; dev: string }

export type TrimType = 'all' | 'pre' | 'around' | 'post'

export interface EventBus {
  data: Record<string, Function[]>
  emit: (event: string, data?: any) => void
  on: (event: string, fn: (data?: any) => void) => void
  off: (event: string, fn: Function) => void
}

export interface Position {
  x: number
  y: number
}

export type FileType = 'file' | 'blob' | 'url'

export interface JSCookie {
  get: (key: string) => string | undefined
  set: (key: string, value: string, exdays?: number) => void
  remove: (key: string) => void
}

export interface LRU {
  set(key: string, value: any): void
  get(key: string): any
  cache: Map<string, any>
  max: number
}

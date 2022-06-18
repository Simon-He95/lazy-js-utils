export type Redirect = 'follow' | 'error' | 'manual'
export type Cache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache'
export type Mode = 'cors' | 'no-cors' | 'same-origin' | 'navigate'
export type ResponseType = 'formData' | 'text' | 'blob' | 'arrayBuffer' | 'json'
export type BodyType = 'form' | 'json' | 'file'
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
export type Credentials = 'omit' | 'include' | 'same-origin'

export interface VFetch {
  url?: string
  baseURL?: string
  body?: any
  method?: Method
  headers?: Record<string, string>
  credentials?: Credentials
  params?: Record<string, string>
  timeout?: number
  responseType?: ResponseType
  bodyType?: BodyType
  cache?: Cache
  redirect?: Redirect
  mode?: Mode
  result?: Promise<any>
  transformResponse?: (response: Response) => Response
  set?: (target: keyof VFetch, value: Record<string, string>) => void
  bodyToString?: () => string
  request?: () => Promise<Response>
  then?: (resolve: (value: any) => void, reject: (reason: any) => void) => Promise<void>
  create?: (options: IFetchOptions) => (options: VFetch) => VFetch
  interceptors?: {
    request: {
      use: (successCallback?: ((response: Response) => Response), errorCallback?: ((error: any) => Promise<never>)) => void
      success: (response: Response) => Response
      error: (error: any) => Promise<any>
    }
    response: {
      use: (successCallback?: ((response: Response) => Response), errorCallback?: ((error: any) => Promise<never>)) => void
      success: (response: Response) => Response
      error: (error: any) => Promise<any>
    }
  }
}

export interface IFetchOptions {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

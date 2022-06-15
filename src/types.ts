export type Redirect = 'follow' | 'error' | 'manual'
export type Cache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache'
export type Mode = 'cors' | 'no-cors' | 'same-origin' | 'navigate'
export type ReturnType = 'formData' | 'text' | 'blob' | 'arrayBuffer' | 'json'
export type BodyType = 'form' | 'json' | 'file'
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
export type Credentials = 'omit' | 'include' | 'same-origin'

export interface IFetch {
  url: string
  method?: Method
  headers?: Record<string, string>
  credentials?: Credentials
  params?: Record<string, string>
  timeout?: number
  returnType?: ReturnType
  bodyType?: BodyType
  cache?: Cache
  redirect?: Redirect
  mode?: Mode
  firstThen?: (response: Response) => Response
}

declare global {
  interface Window {
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number
    webkitCancelAnimationFrame: (handle: number) => void
    mozCancelAnimationFrame: (handle: number) => void
    oCancelAnimationFrame: (handle: number) => void
    msCancelAnimationFrame: (handle: number) => void
    webkitIndexedDB: IDBFactory
    mozIndexedDB: IDBFactory
    msIndexedDB: IDBFactory
    indexedDB: IDBFactory
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
  interface Navigator {
    webkitGetUserMedia: () => void
    mozGetUserMedia: () => void
    msGetUserMedia: () => void
    getUserMedia: () => void
  }
}
export type Redirect = 'follow' | 'error' | 'manual'
export type Cache =
  | 'default'
  | 'no-store'
  | 'reload'
  | 'no-cache'
  | 'force-cache'
export type Mode = 'cors' | 'no-cors' | 'same-origin' | 'navigate'
export type ResponseType = 'formData' | 'text' | 'blob' | 'arrayBuffer' | 'json'
export type BodyType = 'form' | 'json' | 'file'
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
export type Credentials = 'omit' | 'include' | 'same-origin'

export interface IFetchInterceptors {
  request?: {
    success?: (config: IFetchConfig) => IFetchConfig
    error?: (error: any) => Promise<never>
  }
  response?: {
    success?: (response: any) => any
    error?: (error: any) => Promise<never>
  }
  success?: (response: Response) => Response
  error?: (error: any) => Promise<never>
}

export interface IFetchConfig extends IFetchOptions {
  url?: string
  keepalive?: boolean
  body?: any
  retry?: number
  integrity?: string
  referrer?: string
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'unsafe-url'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'same-origin'
  method?: Method
  credentials?: Credentials
  params?: Record<string, string>
  responseType?: ResponseType
  bodyType?: BodyType
  cache?: Cache
  redirect?: Redirect
  mode?: Mode
  signal?: AbortSignal
  cancel?: () => void
  transformResponse?: (response: Response) => Response
}

export interface IFetchOptions {
  baseURL?: string
  timeout?: number
  headers?: Record<string, any>
  interceptors?: IFetchInterceptors
}

export interface DeviceType {
  os: string
  dev: string
}

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
  set: (key: string, value: string, extdays?: number) => void
  delete: (key: string) => void
}

export interface LRU {
  set(key: string, value: any): void
  get(key: string): any
  cache: Map<string, any>
  max: number
  size: () => number
}

export interface ISignature {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  createCanvas(w: number, h: number): void
  clearCanvas(): void
}

export interface FileMD5 {
  HASH: string
  suffix: string
  filename: string
  buffer: ArrayBuffer
}

export interface FileChunk {
  file: Blob
  filename: string
}

export type ChunkDetail = ChunkInfo & {
  isDone: boolean
  remaning: number
  type: string
  size: number
  lastModified: number
}

export interface ChunkInfo {
  start: number
  end: number
  index: number
  hash: string
}

export interface FileSpliceOptions {
  file: File
  chunkSize: number
  callback: (chunk: ChunkDetail) => void
}
export interface Deadline {
  timeRemaining: () => number
  didTimeout: boolean
}

export interface DragEvent {
  dragStart?: (e: any) => void
  dragMove?: (e: any) => void
  dragEnd?: (e: any) => void
}

export interface MutationObserverInit {
  childList?: boolean
  attributes?: boolean
  characterData?: boolean
  subtree?: boolean
  attributeOldValue?: boolean
  characterDataOldValue?: boolean
  attributeFilter?: string[]
}

export interface ParsedURL {
  protocol?: string
  host?: string
  auth?: string
  pathname: string
  hash: string
  search: string
}

export interface IShellMessage {
  status: number
  result: string
}

export type PkgTool = 'npm' | 'yarn' | 'pnpm' | 'bun'

type Keys<A, B> = keyof A | keyof B
type Val<key, A, B> = key extends keyof A
  ? key extends keyof B
    ? A[key] extends number | string | boolean | symbol | null | undefined
      ? A[key] | B[key]
      : Merge<A[key], B[key]>
    : A[key]
  : key extends keyof B
  ? B[key]
  : never

export type Merge<A, B> = { [key in Keys<A, B>]: Val<key, A, B> }

export interface IsESModule {
  default: any
}

export interface NodeWorkerPayload {
  params: string | string[]
  stdio?: 'inherit' | 'pipe'
  errorExit?: boolean
  isLog?: boolean
}

export type UseTimeoutReturn<T> = T extends Function ? () => void : undefined

export type MaybeElement = string | HTMLElement

export type Lang =
  | 'zh-CN'
  | 'en-US'
  | 'ja-JP'
  | 'ko-KR'
  | 'zh-TW'
  | 'zh-HK'
  | 'zh-MO'
  | 'zh-SG'

export type Direction =
  | 'horizontal'
  | 'vertical'
  | 'horizontal-reverse'
  | 'vertical-reverse'

import { isDef } from './isDef'

export const isBrowser = isDef(globalThis?.window)

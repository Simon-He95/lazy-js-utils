import { isDef } from './isDef'

/**
 * 判断当前环境是否具有浏览器全局（window）
 * @description EN: True in environments where `globalThis.window` is defined (typical browsers).
 */
export const isBrowser = isDef(globalThis?.window)

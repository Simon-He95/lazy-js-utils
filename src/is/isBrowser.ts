import { isDef } from './isDef'

/**
 * 判断是浏览器环境
 * @returns
 */
export const isBrowser = () => isDef(window)

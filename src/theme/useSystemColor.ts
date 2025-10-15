import { useEventListener } from '../event'

type Color = 'light' | 'dark'

/**
 * 监听系统颜色模式
 * @description EN: Observe the OS color-scheme preference and invoke the callback with `light` or `dark` whenever it changes.
 * @param { (color: 'light' | 'dark') => void } callback 接收系统配色的回调
 * @returns { () => void } 解绑监听的函数
 */
export function useSystemColor(callback: (color: Color) => void): () => void {
  const match = matchMedia('(prefers-color-scheme: dark)')
  callback(match.matches ? 'dark' : 'light')
  return useEventListener(match, 'change', () =>
    callback(match.matches ? 'dark' : 'light'))
}

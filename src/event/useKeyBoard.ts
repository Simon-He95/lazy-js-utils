import { useEventListener } from './useEventListener'

/**
 * 检测指定按键
 * @param { string } c 按键字符串
 * @param { Function } callback 按键与案件字符串一致时的回调
 * @returns 停止
 */
export function useKeyBoard(c: string, callback: (code: string) => void) {
  return useEventListener(document, 'keydown', (e: KeyboardEvent) => {
    let code = ''
    const key = e.key
    if (e.shiftKey && key !== 'Shift')
      code += 'Shift+'

    if (e.ctrlKey && key !== 'Control')
      code += 'Ctrl+'

    if (e.altKey && key !== 'Alt')
      code += 'Alt+'

    if (e.metaKey && key !== 'Meta')
      code += 'Meta+'

    if (e.code === 'Space')
      code += 'Space'

    code += key
    if (code === c)
      callback(code)
  })
}

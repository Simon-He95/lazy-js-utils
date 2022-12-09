import { useEventListener } from './useEventListener'
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

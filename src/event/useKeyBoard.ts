import { useEventListener } from './useEventListener'

/**
 * Listen for specific keyboard shortcut string, e.g. "Ctrl+Shift+X".
 * Calls the callback when the generated key string matches the provided one.
 *
 * @param c - Shortcut string to match
 * @param callback - Called with the matched code when it occurs
 * @returns A stop function that removes the keydown listener
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

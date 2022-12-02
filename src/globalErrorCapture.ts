import { useEventListener } from './useEventListener'
import { log } from './log'
export function globalErrorCapture() {
  useEventListener(window, 'error', (err) => {
    const { colno, lineno, error, filename, message } = err
    if (message.toLowerCase().includes('script error'))
      return
    const msg = [
      `Message: ${message}\n`,
      `URL: ${filename}:${lineno}:${colno}\n`,
      `Line: ${lineno}\n`,
      `Column: ${colno}\n`,
      `Error object: ${JSON.stringify(error)}`,
    ].join('-')
    log(msg, {
      color: '#337ecc',
      padding: '2px 10px',
      fontSize: 14,
      fontWeight: 'bold',
    }, 'error')
    return false
  })
}


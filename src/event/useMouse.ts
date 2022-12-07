import { useEventListener } from './useEventListener'

export function useMouse(callback: (e: MouseEvent) => void, delay = 0): () => void {
  let timeStart = Date.now()
  return useEventListener(window, 'mousemove', (e) => {
    if (Date.now() - timeStart >= delay) {
      timeStart = Date.now()
      callback(e)
    }
  })
}

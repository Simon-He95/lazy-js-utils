import { addEventListener } from './addEventListener'

export function useMouse(callback: (e: MouseEvent) => void, delay = 0): () => void {
  let timeStart = Date.now()
  return addEventListener(window, 'mousemove', (e) => {
    if (Date.now() - timeStart >= delay) {
      timeStart = Date.now()
      callback(e)
    }
  })
}

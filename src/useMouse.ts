import { addEventListener } from './addEventListener'

export function useMouse(callback: (e: MouseEvent) => void): () => void {
  return addEventListener(window, 'mousemove', callback)
}

import { isSocketUrl } from '../is/isSocketUrl'

export function useSocket(url: string, protocols?: string | string[]) {
  url = isSocketUrl(url) ? url : `ws://${url.replace(/^http[s:\/\/]/, '')}`
  const socket = new WebSocket(url, protocols)
  const receive = (callback: (event: MessageEvent<any>) => void) =>
    socket.addEventListener('message', callback)
  const open = (callback: (event: Event) => void) =>
    socket.addEventListener('open', callback)
  const close = (callback: (event: Event) => void) =>
    socket.addEventListener('close', callback)
  const error = (callback: (event: Event) => void) =>
    socket.addEventListener('error', callback)
  return { socket, receive, send: socket.send.bind(socket), open, close, error }
}

import { isSocketUrl } from '../is/isSocketUrl'

/**
 * WebSocket helper
 * @description EN: Small wrapper around the browser WebSocket that normalizes the URL and returns helper event attachers.
 * @param { string } url 要连接的 URL；这应该是 WebSocket 服务器将响应的 URL。
 * @param { string | string[] } [protocols] 一个协议字符串或者一个包含协议字符串的数组。
 * @returns An object with `socket`, `receive`, `send`, `open`, `close`, and `error` helpers.
 */
export function useSocket(url: string, protocols?: string | string[]) {
  url = isSocketUrl(url) ? url : `ws://${url.replace(/^http[s:/]/, '')}`
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

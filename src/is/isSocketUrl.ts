/**
 * 判断是否是websocket地址
 */
export function isSocketUrl(url: string) {
  return url.startsWith('ws://') || url.startsWith('wss://')
}

/**
 * 判断是否为 WebSocket URL
 * @description EN: Returns true for URLs that start with ws:// or wss://.
 * @param {string} url URL string.
 * @returns {boolean}
 */
export function isSocketUrl(url: string) {
  return url.startsWith('ws://') || url.startsWith('wss://')
}

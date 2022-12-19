export function isSocketUrl(url: string) {
  return url.startsWith('ws://') || url.startsWith('wss://')
}

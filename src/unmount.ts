export function unmount(callback: () => void) {
  window.onunload = callback
  return callback
}

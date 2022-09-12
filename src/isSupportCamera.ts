export function isSupportCamera(): boolean {
  return !!(navigator && (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia))
}

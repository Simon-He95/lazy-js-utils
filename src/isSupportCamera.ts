export function isSupportCamera() {
  return !!(navigator && (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia))
}

/**
 * 判断是否支持调用摄像头
 */
export function isSupportCamera(): boolean {
  return !!(
    navigator
    && (navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia)
  )
}

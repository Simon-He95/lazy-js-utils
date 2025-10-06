/**
 * 判断当前环境是否支持摄像头采集（getUserMedia）
 * @description EN: Heuristic detection for getUserMedia support across legacy vendor prefixes.
 * @returns {boolean}
 */
export function isSupportCamera(): boolean {
  return !!(
    navigator
    && (navigator.getUserMedia
      || (navigator as any).webkitGetUserMedia
      || (navigator as any).mozGetUserMedia
      || (navigator as any).msGetUserMedia)
  )
}

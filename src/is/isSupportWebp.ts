/**
 * 判断当前浏览器是否支持 WebP
 * @description EN: Returns true when the current browser can encode a WebP
 * data URL from a canvas (a common heuristic for WebP support).
 * @returns {boolean}
 */
export function isSupportWebp(): boolean {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0
    )
  }
  catch (error) {
    return false
  }
}

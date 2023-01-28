/**
 * 随机rgba颜色
 * @param { number } [opacity] 透明度 默认 1
 * @returns
 */
export function randomRgba(opacity = 1) {
  return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, ${opacity})`
}

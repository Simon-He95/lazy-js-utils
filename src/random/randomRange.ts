/**
 * 获取随机范围值
 * @param min 最小值 默认 MIN_SAFE_INTEGER
 * @param max 最大值 默认 MAX_VALUE
 * @returns
 * @description EN: Return a random integer between min and max inclusive.
 */
export function randomRange(
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_VALUE,
) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

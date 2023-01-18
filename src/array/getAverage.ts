/**
 *
 * @param { number[] } array 数字数组
 * @param { number } fraction 保留几位小数
 * @returns 平均值
 */
export function getAverage(array: number[], fraction = 2) {
  return (array.reduce((pre, cur) => pre + cur) / array.length).toFixed(
    fraction,
  )
}

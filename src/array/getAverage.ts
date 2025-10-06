/**
 * 计算数字数组的平均值并格式化为指定小数位
 * @description EN: Compute the average of a number array and return it formatted to a fixed number of decimal places.
 * @param {number[]} array Input numbers.
 * @param {number} [fraction] Number of decimal places to keep.
 * @returns {string} Formatted average as string (from toFixed).
 */
export function getAverage(array: number[], fraction = 2): string {
  return (array.reduce((pre, cur) => pre + cur, 0) / array.length).toFixed(
    fraction,
  )
}

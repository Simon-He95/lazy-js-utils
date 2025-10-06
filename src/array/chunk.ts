/**
 * 将数组拆分为指定大小的块
 * @description EN: Split an array into chunks of the given size.
 * @param {T[]} arr Input array to split.
 * @param {number} [size] Maximum size of each chunk.
 * @returns {T[][]} Array of chunked arrays.
 */
export function chunk<T>(arr: T[], size = 1): T[][] {
  if (size < 1)
    return []
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))

  return result
}

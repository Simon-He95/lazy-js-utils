/**
 *
 * @param { T[] } arr 数组
 * @param { number } size 以多少为基准分割
 * @returns  分割后的数组
 */
export function chunk<T>(arr: T[], size = 1) {
  if (size < 1)
    return []
  const result = []
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))

  return result
}

// console.log(chunk([1, 3, 5, 7], 2)); // [ [1, 3], [5, 7]]

export function chunk(arr: any[], size = 1) {
  if (size < 1)
    return []
  const result = []
  for (let i = 0; i < arr.length; i += size)
    result.push(arr.slice(i, i + size))

  return result
}

// console.log(chunk([1, 3, 5, 7], 2)); // [ [1, 3], [5, 7]]

export function getAverage(array: number[], fraction = 2) {
  return (array.reduce((pre, cur) => pre + cur) / array.length).toFixed(
    fraction,
  )
}

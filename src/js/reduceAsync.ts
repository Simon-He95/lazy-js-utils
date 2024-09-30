export async function reduceAsync<T, K>(
  arr: K[],
  reducer: (acc: T, item: K, index: number, arr: K[]) => any,
  initialValue: T,
) {
  let acc = initialValue
  for (let i = 0; i < arr.length; i++) {
    acc = await reducer(acc, arr[i], i, arr)
  }
  return acc
}

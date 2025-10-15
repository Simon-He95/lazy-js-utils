/**
 * 异步 reduce
 * @description EN: Perform an asynchronous reduction over an array, awaiting each reducer invocation before proceeding.
 * @param { K[] } arr 待处理的数组
 * @param { (acc: T, item: K, index: number, arr: K[]) => Promise<T> | T } reducer 异步或同步累加器
 * @param { T } initialValue 初始值
 * @returns { Promise<T> }
 */
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

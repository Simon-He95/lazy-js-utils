/**
 * 捕获 Promise 错误
 * @description EN: Await a promise and return a tuple `[error, result]`, optionally merging extra fields into the error object.
 * @param { Promise<T> } promise 需要处理的 Promise
 * @param { object } [errorExt] 发生错误时附加到错误对象的额外信息
 * @returns { Promise<[U | undefined, T | undefined]> }
 */
export async function catchAwait<T, U = Error>(
  promise: Promise<T> | any,
  errorExt?: object,
): Promise<[U, undefined] | [undefined, T]> {
  try {
    return [undefined, await promise]
  }
  catch (err: any) {
    return errorExt
      ? [Object.assign({}, err, errorExt), undefined]
      : [err, undefined]
  }
}

// async function test() {
//   const p = () => new Promise((resolve) => {
//     setTimeout(() => resolve('2'))
//   })
//   const [err, res] = await catchAwait(p())
//   console.log({ err, res })
//   if (err)
//     return
//   console.log({ res })
// }

// test()

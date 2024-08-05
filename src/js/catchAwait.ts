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

export async function catchAwait<T, U = Error>(
  promise: Promise<T>,
  errorExt?: Object,
): Promise<[U, undefined] | [undefined, T]> {
  return promise
    .then<[undefined, T]>(res => [undefined, res])
    .catch<[U, undefined]>(err =>
      errorExt
        ? [Object.assign({}, err, errorExt), undefined]
        : [err, undefined],
    )
}

// async function test() {
//   const p = () => new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('asdas')
//     }, 1000)
//   })
//   const [err, res] = await catchAwait(p())
//   if (err)
//     return
//   console.log({ res })
// }

// test()

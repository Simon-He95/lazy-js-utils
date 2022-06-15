export function interceptError(fn: Function) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fn())
    }
    catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

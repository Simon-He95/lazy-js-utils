export function interceptError(fn: Function) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fn())
    }
    catch (error: any) {
      reject(new Error(error))
    }
  })
}

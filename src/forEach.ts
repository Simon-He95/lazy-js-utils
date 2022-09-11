interface ForEachCallback {
  (value: any, index: number, array: any[]): void
}
export function forEach(array: any[], callback: ForEachCallback): void {
  let result
  try {
    array.forEach((...args) => {
      const res = callback(...args)
      if (res !== undefined) {
        result = res
        throw new Error('forEach break')
      }
      return res
    })
  }
  catch (error: any) {
    if (error.message !== 'forEach break')
      throw error
  }
  return result
}


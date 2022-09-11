interface Callback {
  (value: any, index: number, array: any[], aborted: Function): void
}
export function forEach(array: any[], callback: Callback): void {
  function aborted() {
    throw new Error('forEach break')
  }
  try {
    array.forEach((...args) => callback(...args, aborted))
  }
  catch (error: any) {
    if (error.message !== 'forEach break')
      throw error
  }
}


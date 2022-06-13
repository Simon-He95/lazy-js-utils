export function debounce(fn: Function, time: number) {
  let timer: any = null
  return function (this: any, e?: any) {
    if (timer !== null)
      clearTimeout(timer)
    setTimeout(() => {
      const result = fn.call(this, e)
      timer = null
      return result
    }, time)
  }
}

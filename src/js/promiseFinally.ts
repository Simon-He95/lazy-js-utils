import { isFn } from '../is/isFn'

export async function promiseFinally(
  fn: Promise<any> | Function,
  finalFn: Function,
) {
  let result
  try {
    result = await (isFn(fn) ? fn() : fn)
  }
  finally {
    finalFn()
  }
  return result
}

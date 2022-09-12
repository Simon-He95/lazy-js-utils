import { isUndef } from './isUndef'

interface ForEachCallback<T> {
  (value: T, index: number, array: T[]): any
}
export function forEach<T>(array: T[], callback: ForEachCallback<T>): any {
  for (let i = 0; i < array.length; i++) {
    const res = callback(array[i], i, array)
    if (!isUndef(res))
      return res
  }
  return undefined
}

import { isArray } from './../is/isArray'
export function toArray(array: any) {
  return isArray(array) ? array : [array]
}

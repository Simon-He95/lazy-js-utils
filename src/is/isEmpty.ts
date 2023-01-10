import { isArray } from './isArray'

export const isEmpty = (val: unknown) =>
  val === undefined
  || val === null
  || val === ''
  || (isArray(val) && !val.length)

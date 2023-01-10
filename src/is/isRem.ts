import { isStr } from './isStr'

export const isRem = (value: unknown): value is string =>
  isStr(value) && value.endsWith('rem')

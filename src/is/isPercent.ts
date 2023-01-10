import { isStr } from './isStr'

export const isPercent = (value: unknown): value is string =>
  isStr(value) && value.endsWith('%')

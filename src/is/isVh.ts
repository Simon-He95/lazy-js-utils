import { isStr } from './isStr'

export const isVh = (value: unknown): value is string =>
  isStr(value) && value.endsWith('vh')

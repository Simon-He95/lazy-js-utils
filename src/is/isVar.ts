import { isStr } from './isStr'

export const isVar = (value: unknown): value is string =>
  isStr(value) && value.startsWith('var(')

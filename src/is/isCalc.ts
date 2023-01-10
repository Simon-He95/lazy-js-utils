import { isStr } from './isStr'

export const isCalc = (value: unknown): value is string =>
  isStr(value) && value.startsWith('calc(')

import { isStr } from './isStr'

export const isVw = (value: unknown): value is string =>
  isStr(value) && value.endsWith('vw')

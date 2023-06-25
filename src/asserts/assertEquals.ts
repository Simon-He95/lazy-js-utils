import { isEqual } from '../is/isEqual'

type Allowed =
  | unknown
  | void
  | null
  | undefined
  | boolean
  | number
  | string
  | unknown[]
  | object

export function assertEquals<T extends Allowed, U extends T>(
  val: T,
  expected: U,
  message = 'val is not same as expected',
): asserts val is U {
  if (!isEqual(val, expected))
    throw new Error(message)
}

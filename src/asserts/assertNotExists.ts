export function assertNotExists<T>(
  val: T | null | undefined,
  message = 'val exists',
): asserts val is null | undefined {
  if (val !== null && val !== undefined)
    throw new Error(message)
}

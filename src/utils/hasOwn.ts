export function hasOwn(obj: object, key: string): boolean {
  return Reflect.has(obj, key)
}

export function isDef<T = any>(v: T | undefined): v is T {
  return typeof v !== 'undefined'
}

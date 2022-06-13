const _toString = Object.prototype.toString

export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

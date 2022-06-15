import { _toString } from './common'
export function isPromise(o: any): boolean {
  return _toString.call(o) === '[object Promise]'
}

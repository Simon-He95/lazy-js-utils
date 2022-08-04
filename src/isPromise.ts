import { _toString } from './common'
export function isPromise(o: any): o is Promise<any> {
  return _toString.call(o) === '[object Promise]'
}

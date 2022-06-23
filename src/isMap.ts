import { _toString } from './common';
export function isMap(o: any) {
  return _toString.call(o) === '[object Map]';
}

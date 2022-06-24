import { isStr } from './isStr'
import { isFn } from './isFn'
import { isPlainObject } from './isPlainObject'
import { isArray } from './isArray'
import { isSet } from './isSet'
import { isMap } from './isMap'
import { isReg } from './isReg'
import { isNaN } from './isNaN'
import { isNull } from './isNull'
import { isUndef } from './isUndef'
import { isSymbol } from './isSymbol'
import { isBool } from './isBool'
import { isNum } from './isNum'
import { isPromise } from './isPromise'
import { isDate } from './isDate'
import { isWeakMap } from './isWeakMap'
import { isWeakSet } from './isWeakSet'
export function isType(s: any, type: string) {
  type = type.toLocaleLowerCase()
  if (!type)
    throw new Error('type is required')

  const types: Record<string, Function> = {
    str: isStr,
    s: isStr,
    string: isStr,
    fn: isFn,
    f: isFn,
    function: isFn,
    object: isPlainObject,
    o: isPlainObject,
    array: isArray,
    a: isArray,
    set: isSet,
    map: isMap,
    m: isMap,
    reg: isReg,
    r: isReg,
    b: isBool,
    boolean: isBool,
    n: isNum,
    number: isNum,
    u: isUndef,
    undefined: isUndef,
    null: isNull,
    symbol: isSymbol,
    nan: isNaN,
    wm: isWeakMap,
    ws: isWeakSet,
    promise: isPromise,
    weakmap: isWeakMap,
    weakset: isWeakSet,
    date: isDate,
  }
  return type.split('|').some(item => types[item.trim()]?.(s))
}

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

/**
 * 判断对象类型
 */
/**
 * 判断值是否匹配指定的类型标签
 * @description EN: Flexible type checker that accepts a shorthand type string
 * (like 'str', 'array', 'map') or multiple types separated by '|'. The
 * implementation delegates to specific `isX` helpers.
 * @param s Candidate value to test.
 * @param type Type label or pipe-separated labels.
 * @returns boolean True when any of the provided type labels match.
 */
export function isType<T>(s: T, type: string): boolean {
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

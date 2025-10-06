import { isObject } from '../is/isObject'
import { isArray } from '../is/isArray'

/**
 * 通过函数的方式获取对象中指定的数据
 * @param { Record<any, any> | any[] } target 对象或数组
 * @param { Record<string, Function> } options {}
 * @returns
 * @description EN: Walk a target object or array and invoke callback functions for specified paths, passing (value, index, target).
 */
export function traverse<T extends Record<any, any> | any[]>(
  target: T,
  options: Record<string, (res: any, i: number, target: T) => void> = {},
) {
  if (!isObject(target))
    return target
  isArray(target)
    ? target.forEach((item, index) => executor(item, index, options))
    : executor(target, 0, options)
  return target
}

function executor(
  target: Record<any, any>,
  index: number,
  options: Record<string, Function> = {},
) {
  for (const key in options) {
    const result = key.split('.').reduce((pre, cur) => pre[cur], target)
    options[key](result, index, target)
  }
}

// const o = {
//   name: 'simon',
//   age: 28,
// }

// traverse(o, {
//   name(...res) {
//     console.log(res)
//   },
// })

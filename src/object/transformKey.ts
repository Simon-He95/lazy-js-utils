import { isObject } from '../is/isObject'
import { isArray } from '../is/isArray'

export function transformKey(
  target: Record<string, any> | Record<string, any>[],
  options: Record<string, string>,
  deleteEmpty = false,
) {
  return !isObject(target)
    ? target
    : isArray(target)
      ? target.map(item => transform(item, options, deleteEmpty))
      : transform(target, options, deleteEmpty)
}

function transform(
  target: Record<string, any>,
  options: Record<string, string>,
  deleteEmpty: boolean,
) {
  for (const key in options) {
    let targetKey = ''
    let targetItem: any = null
    const keys = key.split('.')
    let breakFlag = false
    const result = keys.reduce((pre, cur, i) => {
      if (!pre) {
        // 如果当前属性不存在 跳过当前key
        breakFlag = true
        return pre
      }
      if (i === keys.length - 1) {
        targetKey = cur
        targetItem = pre
      }
      return pre[cur]
    }, target)
    if (breakFlag)
      continue
    const newKey = options[key]
    if (newKey.includes('.')) {
      const newKeys = newKey.split('.')
      const lastKey = newKeys.pop()
      const lastItem = newKeys.reduce((pre, cur) => {
        if (!pre[cur]) {
          pre[cur] = {}
        }
        return pre[cur]
      }, target)
      lastItem[lastKey as any] = result
      keys.pop()
      delete targetItem[targetKey]
      continue
    }
    else {
      if (target[newKey]) {
        throw new Error(`key ${newKey} already exists`)
      }
      keys.pop()
      target[newKey] = result
      delete targetItem[targetKey]
    }
    if (deleteEmpty && !Object.keys(targetItem).length) {
      // 如果当前对象为空，删除当前对象
      // 遍历到最后一个属性
      let obj = target
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]]
      }

      // 删除最后一个属性
      delete obj[keys[keys.length - 1]]
    }
  }
  return target
}

// console.log(
//   transformKey(
//     {
//       a: {
//         b: {
//           c: 'nihao',
//         },
//       },
//     },
//     {
//       'a.b.c': 'data',
//     },
//   ),
// )

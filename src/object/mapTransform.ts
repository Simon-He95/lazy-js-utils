import { isArray } from '../is/isArray'
import { isPlainObject } from '../is/isPlainObject'

const arr_reg = /(\w+)\[(\w+)\]/

export function mapTransform(
  o: Record<string, any>,
  map: Record<string, string>,
  keepRest: boolean = false,
) {
  const mapResult = Object.keys(map).reduce((result, key) => {
    result[map[key]] = getMapValue(key, o)
    return result
  }, {} as Record<string, any>)
  if (!keepRest) return mapResult

  const keys = Object.keys(map)
  const cloneO = JSON.parse(JSON.stringify(o))
  keys.forEach((key) => {
    const keyDot = key.split('.') as string[]
    const len = keyDot.length - 1
    keyDot.reduce((target, k, i) => {
      if (len === i) delete target[k]
      if (arr_reg.test(k)) {
        let result
        k.replace(
          arr_reg,
          (e: string, r: string, q: string) => (result = target[r][q]),
        )
        return result
      }
      return target[k]
    }, cloneO)
  })
  const rest = filterEmpty(cloneO)
  return Object.assign(rest, mapResult)
}

export function mapTransformBack(
  o: Record<string, any>,
  map: Record<string, string>,
  keepRest: boolean = false,
) {
  const mapResult = Object.entries(map).reduce(
    (result, [key, value]) => generateMapKey(key, result, o[value]),
    {},
  )
  if (!keepRest) return mapResult
  const values = Object.values(map)
  const rest = Object.keys(o)
    .filter((k) => !values.includes(k))
    .reduce((result, key) => {
      result[key] = o[key]
      return result
    }, {} as Record<string, any>)
  return Object.assign(rest, mapResult)
}

function getMapValue(key: string, o: Record<string, any>) {
  return key
    .split('.')
    .reduce(
      (o, k) =>
        arr_reg.test(k)
          ? JSON.parse(k.replace(arr_reg, (e, r, q) => JSON.stringify(o[r][q])))
          : o[k],
      o,
    )
}

function generateMapKey(key: string, result: Record<string, any>, value: any) {
  const arr = key.split('.')
  arr.reduce((pre: any, cur: any, i) => {
    if (i === arr.length - 1) {
      pre[cur] = value
    } else if (arr_reg.test(cur)) {
      let newO
      cur.replace(arr_reg, (e: any, r: any, q: any) => {
        pre[r] = pre[r] ?? []
        newO = pre[r][q] = pre[r][q] ?? {}
      })
      return newO
    } else if (i !== arr.length - 1) {
      return (pre[cur] = pre[cur] ?? {})
    }
    return pre
  }, result)
  return result
}

function filterEmpty(o: Record<string, any>) {
  for (const key in o) {
    const item = o[key]
    if (isPlainObject(item)) {
      if (!Object.keys(item).length) delete o[key]
      else filterEmpty(item)
    } else if (isArray(item)) {
      if (!item.length || !Object.keys(item[0]).length) delete o[key]
      else item.forEach((i) => filterEmpty(i))
    }
  }
  return o
}

// const o = {
//   a: {
//     data: 'nihao',
//     age: '17',
//   },
// }
// console.log(mapTransform(o, { 'a.data': 'data', 'a.age': 'age' }))

import { isObject } from '../is'

export function mapToObject(map: Map<any, any>) {
  return Array.from(map).reduce((result, [key, value]) => {
    if (isObject(key))
      key = JSON.stringify(key)

    result[key] = value
    return result
  }, {} as Record<string, any>)
}

// const map = new Map()
// map.set(1, '123')
// map.set({ name: 'ss' }, '2')

// console.log(mapToObject(map))

import { isPlainObject } from '../is/isPlainObject'

export function deepMerge(target: Record<any, any>, ...sources: Record<any, any>[]) {
  if (!isPlainObject(target))
    return target

  sources.forEach((source) => {
    if (!isPlainObject(source))
      throw new Error(`${source} is not objectType`)

    if (!Object.keys(target).length) {
      Object.assign(target, source)
    }
    else {
      for (const key in source) {
        if (
          key in target
          && isPlainObject(target[key])
          && isPlainObject(source[key])
        )
          deepMerge(target[key], source[key])
        else
          target[key] = source[key]
      }
    }
  })
  return target
}

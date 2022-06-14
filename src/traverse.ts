export function traverse(target: Record<any, any> | any[], options: Record<string, Function> = {}) {
  if (typeof target !== 'object')
    return target
  Array.isArray(target)
    ? target.forEach((item, index) => executor(item, index, options))
    : executor(target, 0, options)
  return target
}

function executor(target: Record<any, any>, index: number, options: Record<string, Function> = {}) {
  for (const key in options) {
    const result = key.split('.').reduce((pre, cur) => {
      return pre[cur]
    }, target)
    options[key](result, index, target)
  }
}


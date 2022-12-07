export function transformKey(target: Record<string, any> | Record<string, any>[], options: Record<string, string>) {
  return typeof target !== 'object'
    ? target
    : Array.isArray(target)
      ? target.map(item => transform(item, options))
      : transform(target, options)
}

function transform(target: Record<string, any>, options: Record<string, string>) {
  for (const key in options) {
    let targetKey = ''
    let targetItem: any = null
    const keys = key.split('.')
    const result = keys.reduce((pre, cur, i) => {
      if (i === keys.length - 1) {
        targetKey = cur
        targetItem = pre
      }
      return pre[cur]
    }, target)
    targetItem[options[key]] = result
    delete targetItem[targetKey]
  }
  return target
}

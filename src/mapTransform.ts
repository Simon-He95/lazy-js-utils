const arr_reg = /(\w+)\[(\w+)\]/

export function mapTransform(o: Record<string, any>, map: Record<string, string>) {
  return Object.keys(map).reduce((result, key) => {
    result[map[key]] = getMapValue(key, o)
    return result
  }, {} as Record<string, any>)
}

export function mapTransformBack(o: Record<string, any>, map: Record<string, string>) {
  return Object.entries(map).reduce((result, [key, value]) => generateMapKey(key, result, o[value]), {})
}

function getMapValue(key: string, o: Record<string, any>) {
  return key.split('.').reduce((o, k) => arr_reg.test(k)
    ? JSON.parse(k.replace(arr_reg, (e, r, q) => JSON.stringify(o[r][q])))
    : o[k], o)
}

function generateMapKey(key: string, result: Record<string, any>, value: any) {
  const arr = key.split('.')
  arr.reduce((pre: any, cur: any, i) => {
    if (i === arr.length - 1) { pre[cur] = value }
    else if (arr_reg.test(cur)) {
      let newO
      cur.replace(arr_reg, (e: any, r: any, q: any) => {
        pre[r] = pre[r] ?? []
        newO = pre[r][q] = pre[r][q] ?? {}
      })
      return newO
    }
    else if (i !== arr.length - 1) { return pre[cur] = pre[cur] ?? {} }
    return pre
  }, result)
  return result
}


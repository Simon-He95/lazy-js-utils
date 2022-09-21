const arr_reg = /(\w+)\[(\w+)\]/

export function mapTransform(o: Record<string, any>, map: Record<string, string>) {
  return Object.keys(map).reduce((result, key) => {
    result[map[key]] = getMapValue(key, o)
    return result
  }, {} as Record<string, any>)
}

export function mapTransformBack(o: Record<string, any>, map: Record<string, string>, keepRest: Boolean = false) {
  const mapResult = Object.entries(map).reduce((result, [key, value]) => generateMapKey(key, result, o[value]), {})
  if (!keepRest)
    return mapResult
  const values = Object.values(map)
  const rest = Object.keys(o).filter(k => !values.includes(k)).reduce((result, key) => {
    result[key] = o[key]
    return result
  }, {} as Record<string, any>)
  return Object.assign(rest, mapResult)
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


const arr_reg = /(\w+)\[(\w+)\]/

export function generateKeyObject(o: Record<string, any>, key: string, mapKey: string) {
  return Object.keys(o).reduce((result, k) => {
    const item = o[k]
    return generateMapKey(item[mapKey], result, item[key])
  }, {})
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

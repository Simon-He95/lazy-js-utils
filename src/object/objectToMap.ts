export function objectToMap(obj: Record<string, any>) {
  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key]
    if (/\{.*\}/.test(key))
      result.set(JSON.parse(key), value)
    else result.set(key, value)
    return result
  }, new Map())
}

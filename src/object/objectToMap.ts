/**
 * Convert an object to a Map. Keys that look like JSON objects ("{...}") are
 * parsed back to objects using JSON.parse.
 *
 * @param {Record<string, any>} obj Input object.
 * @returns {Map<any, any>} Map representation.
 */
export function objectToMap(obj: Record<string, any>) {
  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key]
    if (/\{.*\}/.test(key))
      result.set(JSON.parse(key), value)
    else result.set(key, value)
    return result
  }, new Map())
}

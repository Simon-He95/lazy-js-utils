import { isDef } from '../is/isDef'

/**
 *
 * @param { any[] } sortArr 数组
 * @param { string[] } order 顺序
 * @param { string } prop 按照哪个属性
 * @returns
 */
export function sortByOrder<T>(
  sortArr: T[],
  order: string[],
  prop?: string,
): T[] {
  if (!order)
    return sortArr
  const result: any[] = []
  let insertIndex
  const _prop = prop ? prop.split('.') : undefined
  order.forEach((key, idx) => {
    if (key === '*')
      return (insertIndex = idx)
    const index = sortArr.findIndex(item => getDepthVal(_prop, item) === key)
    if (index !== -1) {
      result.push(sortArr[index])
      sortArr.splice(index, 1)
    }
  })
  if (isDef(insertIndex))
    result.splice(insertIndex, 0, ...sortArr)
  else result.concat(sortArr)
  return result

  function getDepthVal(_prop: string[] | undefined, item: any) {
    return _prop
      ? _prop.reduce((result, cur) => {
          return result?.[cur]
        }, item)
      : item
  }
}

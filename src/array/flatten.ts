import { isArray } from '../is/isArray'

/**
 *
 * @param { Record<string, any> | Record<string, any>[] } o 对象或者数组
 * @param { string }flattenProps 展开的属性默认为children
 * @param { boolean }onlyLastNode  只保留最后一层级的数据
 * @returns 一层的数组
 */
export function flatten(
  o: Record<string, any> | Record<string, any>[],
  flattenProps = 'children',
  onlyLastNode = false,
  result: Record<string, any>[] = [],
) {
  o = isArray(o) ? o : [o]
  o.forEach((node: any) => {
    const children = node[flattenProps]
    if (!onlyLastNode)
      result.push(node)

    if (children)
      flatten(children, flattenProps, onlyLastNode, result)
    else if (onlyLastNode)
      result.push(node)
  })
  return result
}

// const obj = {
//   a: '1',
//   children: [
//     {
//       b: '12',
//       children: {
//         e: '44'
//       }
//     },
//     {
//       c: '33', children: [
//         { dd: '5' }
//       ]
//     }
//   ]
// }

// console.log(flatten(obj))

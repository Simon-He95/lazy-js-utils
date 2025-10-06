import { isArray } from '../is/isArray'

/**
 * 将嵌套结构扁平化为数组
 * @description EN: Flatten a nested tree-like structure into a flat array. The property used for children can be customized.
 * @param { Record<string, any> | Record<string, any>[] } o Object or array to flatten.
 * @param { string } [flattenProps] Property name that holds children.
 * @param { boolean } [onlyLastNode] When true, only keep leaf nodes.
 * @param { any[] } [result] Internal accumulator used during recursion.
 * @returns { any[] } Flattened array of nodes.
 */
export function flatten<T extends Record<string, any>>(
  o: T | T[],
  flattenProps = 'children',
  onlyLastNode = false,
  result: T[] = [],
): T[] {
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

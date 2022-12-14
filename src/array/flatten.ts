import { isArray } from '../is/isArray'

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

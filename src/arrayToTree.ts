import { isPlainObject } from './isPlainObject'

interface ArrayToTreeOptions {
  id?: number | string
  pid?: number | string
  children?: string
}
export function arrayToTree(array: Record<string, any>[], parentId: number | ArrayToTreeOptions = 0, options: ArrayToTreeOptions = {}): Record<string, any> {
  if (isPlainObject(parentId)) {
    options = parentId as ArrayToTreeOptions
    parentId = 0
  }
  const { id = 'id', pid = 'pid', children = 'children' } = options
  return transformTree(parentId)[0]
  function transformTree(parentId: number | ArrayToTreeOptions = 0): Record<string, any> {
    return array
      .filter(item => item[pid] === parentId)
      .map(item => ({
        ...item,
        [children]: transformTree(item[id]),
      }))
  }
}

// [
//   {id: 1, parent_id: 0, label: '一级'},
//   {id: 2, parent_id: 1, label: '二级'},
//   {id: 3, parent_id: 1, label: '二级'}
// ],

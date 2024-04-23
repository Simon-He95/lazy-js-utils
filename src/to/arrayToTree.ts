import { isPlainObject } from '../is/isPlainObject'

interface ArrayToTreeOptions {
  id?: number | string
  pid?: number | string
  children?: string
}

/**
 * 将数组转为树
 * @param { Record<string, any>[] } array 数组
 * @param { number } parentId 父节点的id 默认 0
 * @param { ArrayToTreeOptions } options {
  id?: number | string 默认 'id'
  pid?: number | string 默认 'pid'
  children?: string 默认 'children'
}
 * @returns Record<string, any>
 */
export function arrayToTree(
  array: Record<string, any>[],
  parentId = 0,
  options: ArrayToTreeOptions = {},
): Record<string, any> {
  if (isPlainObject(parentId)) {
    options = parentId as ArrayToTreeOptions
    parentId = 0
  }
  const { id = 'id', pid = 'pid', children = 'children' } = options
  return transformTree(parentId)[0]
  function transformTree(parentId: number): Record<string, any> {
    return array
      .filter(item => item[pid] === parentId)
      .map(item => ({
        ...item,
        [children]: transformTree(item[id]),
      }))
  }
}

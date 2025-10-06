import { isPlainObject } from '../is/isPlainObject'

interface ArrayToTreeOptions {
  id?: number | string
  pid?: number | string
  children?: string
}

/**
 * Convert a flat array of records into a tree structure.
 *
 * Example: pass an array with id/pid and this will nest children under the
 * configured `children` key. `options` can override the id/pid/children
 * property names.
 *
 * @param {Record<string, any>[]} array Source array of records.
 * @param {number|string} [parentId] Parent id to start building from.
 * @param {ArrayToTreeOptions} [options] Optional keys configuration.
 * @returns {Record<string, any>} A tree node (root node is returned).
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

/**
 * Flatten a tree into an array. The root node is included and children are
 * recursively appended. The `children` property is removed from returned
 * objects.
 *
 * @param {Record<string, any>} tree Root node.
 * @param {string} [children] Children key name.
 * @returns {Record<string, any>[]} Flattened node array.
 */
export function treeToArray(
  tree: Record<string, any> = {},
  children = 'children',
): Record<string, any>[] {
  const result: Record<string, any>[] = []
  result.push({ ...tree })
  if (tree[children]?.length)
    transformArray(tree[children], result)
  return result.filter(item => delete item[children])
}

function transformArray(
  children: any[],
  result: any[] = [],
): Record<string, any>[] {
  return children.reduce((result, item) => {
    result.push({ ...item })
    return item.children.length ? transformArray(item.children, result) : result
  }, result)
}

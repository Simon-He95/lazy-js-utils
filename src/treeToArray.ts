export function treeToArray(tree: Record<string, any> = {}, children = 'children') {
  const result: Record<string, any>[] = []
  result.push({ ...tree })
  if (tree[children].length)
    transformArray(tree[children], result)
  return result.filter(item => delete item[children])
}

function transformArray(children: any[], result: any[] = []): Record<string, any>[] {
  return children.reduce((result, item) => {
    result.push({ ...item })
    return item.children.length
      ? transformArray(item.children, result)
      : result
  }, result)
}

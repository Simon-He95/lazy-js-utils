export function isNode(target: unknown): target is Node {
  return target instanceof Node || isNumber((target as Node)?.nodeType)
}

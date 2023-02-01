import { isNum } from './isNum'

export function isNode(target: unknown): target is Node {
  return target instanceof Node || isNum((target as Node)?.nodeType)
}

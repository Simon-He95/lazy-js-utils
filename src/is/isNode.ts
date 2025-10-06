import { isNum } from './isNum'

/**
 * 判断目标是否为 DOM Node
 * @description EN: Returns true when the target is a DOM Node or looks like one (has numeric nodeType).
 * @param {unknown} target Candidate value.
 * @returns {target is Node}
 */
export function isNode(target: unknown): target is Node {
  return target instanceof Node || isNum((target as Node)?.nodeType)
}

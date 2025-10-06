/**
 * 判断目标是否为 HTMLIFrameElement
 * @description EN: Narrow type guard for iframe elements.
 * @param {unknown} target Candidate value.
 * @returns {target is HTMLIFrameElement}
 */
export function isIFrameElement(target: unknown): target is HTMLIFrameElement {
  return (target as HTMLIFrameElement)?.tagName?.toUpperCase() === 'IFRAME'
}

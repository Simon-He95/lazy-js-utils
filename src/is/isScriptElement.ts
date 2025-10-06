/**
 * 判断目标是否为 HTMLScriptElement
 * @description EN: Narrow type guard for <script> elements.
 * @param {unknown} target Candidate value.
 * @returns {target is HTMLScriptElement}
 */
export function isScriptElement(target: unknown): target is HTMLScriptElement {
  return (target as HTMLScriptElement)?.tagName?.toUpperCase() === 'SCRIPT'
}

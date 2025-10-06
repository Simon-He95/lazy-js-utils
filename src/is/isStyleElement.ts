/**
 * 判断目标是否为 HTMLStyleElement
 * @description EN: Narrow type guard for <style> elements.
 * @param {unknown} target Candidate value.
 * @returns {target is HTMLStyleElement}
 */
export function isStyleElement(target: unknown): target is HTMLStyleElement {
  return (target as HTMLStyleElement)?.tagName?.toUpperCase() === 'STYLE'
}

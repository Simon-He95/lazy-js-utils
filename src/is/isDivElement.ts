/**
 * 判断目标是否为 HTMLDivElement
 * @description EN: Narrow type guard to detect <div> elements.
 * @param {unknown} target Candidate value.
 * @returns {target is HTMLDivElement}
 */
export function isDivElement(target: unknown): target is HTMLDivElement {
  return (target as HTMLDivElement)?.tagName?.toUpperCase() === 'DIV'
}

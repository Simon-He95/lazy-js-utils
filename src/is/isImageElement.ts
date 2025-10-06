/**
 * 判断目标是否为 HTMLImageElement
 * @description EN: Narrow type check to determine whether the target is an <img> element.
 * @param {unknown} target Candidate value.
 * @returns {target is HTMLImageElement}
 */
export function isImageElement(target: unknown): target is HTMLImageElement {
  return (target as HTMLImageElement)?.tagName?.toUpperCase() === 'IMG'
}

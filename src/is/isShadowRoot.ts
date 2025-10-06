/**
 * 判断目标是否为 ShadowRoot
 * @description EN: Type guard for ShadowRoot instances (if supported in environment).
 * @param {unknown} target Candidate value.
 * @returns {target is ShadowRoot}
 */
export function isShadowRoot(target: unknown): target is ShadowRoot {
  return typeof ShadowRoot !== 'undefined' && target instanceof ShadowRoot
}

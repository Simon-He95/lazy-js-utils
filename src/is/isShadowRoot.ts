export function isShadowRoot(target: unknown): target is ShadowRoot {
  return typeof ShadowRoot !== 'undefined' && target instanceof ShadowRoot
}

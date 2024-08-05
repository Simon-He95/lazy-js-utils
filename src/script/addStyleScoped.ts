export function addStyleScoped(s: string, scoped: string) {
  return s.replace(/([.#]*\w+)[\s.>+\w]*\{/g, (v, k) =>
    v.replace(k, `[${scoped}] ${k}`))
}

export function addStyleScoped(s: string, scoped: string) {
  return s.replace(/([\.#]*\w+)[\s.>+\w]*{/gm, (v, k) =>
    v.replace(k, `[${scoped}] ${k}`))
}

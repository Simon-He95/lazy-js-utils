export function isBottom(distance = 0): boolean {
  return document.documentElement.clientHeight + window.scrollY + distance
    >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
}

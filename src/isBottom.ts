export function isBottom(distance: number = 0): boolean {
  return document.documentElement.clientHeight + window.scrollY + distance >=
    (document.documentElement.scrollHeight || document.documentElement.clientHeight);

}

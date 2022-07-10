export function findElement(selector: string, single?: boolean) {
  return single
    ? document.querySelectorAll(selector)
    : document.querySelector(selector)
}

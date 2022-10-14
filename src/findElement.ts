export function findElement(selector: string, all?: boolean) {
  return (all
    ? document.querySelectorAll(selector) as NodeListOf<Element> | undefined
    : document.querySelector(selector)) as HTMLElement | null
}

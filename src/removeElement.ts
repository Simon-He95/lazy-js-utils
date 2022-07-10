export function removeElement(el: HTMLElement): void {
  if (el.parentNode)
    el.parentNode.removeChild(el)
}

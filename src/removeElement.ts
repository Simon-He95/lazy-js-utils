export function removeElement(el: HTMLElement | ChildNode): void {
  if (el.parentNode)
    el.parentNode.removeChild(el)
}

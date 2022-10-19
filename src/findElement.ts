import { isBool } from './isBool'
import { isNull } from './isNull'

export function findElement(selector: string, all: boolean | HTMLElement = false, currentNode: HTMLElement | Document = document) {
  if (isNull(all))
    return
  if (!isBool(all)) {
    currentNode = all as unknown as HTMLElement
    all = false
  }

  return (all
    ? currentNode.querySelectorAll(selector) as NodeListOf<Element> | undefined
    : currentNode.querySelector(selector) as HTMLElement | null)
}

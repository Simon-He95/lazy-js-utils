import { isBool } from './isBool'
import { isNull } from './isNull'

export function findElement(selector: string): HTMLElement | null
export function findElement<T extends boolean | HTMLElement>(selector: string, all?: T, currentNode?: HTMLElement | Document): T extends true ? NodeListOf<Element> | undefined : HTMLElement | null

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

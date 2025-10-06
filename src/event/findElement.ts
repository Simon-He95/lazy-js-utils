import { isArray } from '../is/isArray'
import { isBool } from '../is/isBool'
import { isNull } from '../is/isNull'

/**
 * Find element(s) by CSS selector.
 *
 * - If `selector` is a string and `all` is truthy, returns a NodeList of matches.
 * - If `selector` is a string and `all` is falsy, returns the first matched
 *   HTMLElement or null.
 * - If `selector` is an array of selectors, returns an array of Elements
 *   matching all selectors (flattened).
 * - If an actual HTMLElement or NodeList is passed as `selector`, it is
 *   returned unchanged (passthrough) which makes this helper safe to call
 *   on union-typed variables.
 *
 * @param selector - CSS selector, array of selectors, HTMLElement, NodeList, or falsy
 * @param all - when true, return all matched nodes; when an HTMLElement is
 *   passed, it is used as the `currentNode` to query from. Default is false.
 * @param currentNode - Root node to query from (defaults to `document`).
 */
export function findElement(
  selector: string,
  all?: true | HTMLElement,
  currentNode?: HTMLElement | Document,
): NodeListOf<Element> | undefined
export function findElement(
  selector: string,
  all?: false | undefined | HTMLElement,
  currentNode?: HTMLElement | Document,
): HTMLElement | null
export function findElement(
  selector: string[],
  all?: boolean | HTMLElement,
  currentNode?: HTMLElement | Document,
): Element[]
export function findElement(
  selector: HTMLElement | NodeListOf<Element> | null | undefined,
): HTMLElement | NodeListOf<Element> | null | undefined

export function findElement(
  selector:
    | string
    | string[]
    | HTMLElement
    | NodeListOf<Element>
    | null
    | undefined,
  all: boolean | HTMLElement = false,
  currentNode: HTMLElement | Document = document,
) {
  // Passthrough: if caller provided an Element/NodeList or nothing, return it.
  if (selector == null)
    return selector as any

  if (typeof selector !== 'string' && !isArray(selector))
    return selector as any

  if (isNull(all))
    return

  if (!isBool(all)) {
    currentNode = all as unknown as HTMLElement
    all = false
  }

  if (isArray(selector)) {
    return selector.reduce((result: Element[], c) => {
      const item = all
        ? currentNode.querySelectorAll(c)
        : currentNode.querySelector(c)
      if (!item)
        return result
      if (all)
        return result.concat(Array.from(item as NodeListOf<Element>))
      return result.concat(item as Element)
    }, [] as Element[])
  }

  return all
    ? (currentNode.querySelectorAll(selector as string) as
    | NodeListOf<Element>
    | undefined)
    : (currentNode.querySelector(selector as string) as HTMLElement | null)
}

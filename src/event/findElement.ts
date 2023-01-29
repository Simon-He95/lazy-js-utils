import { isArray } from '../is/isArray'
import { isBool } from '../is/isBool'
import { isNull } from '../is/isNull'

/**
 * 查找元素
 * @param { string | string[] } selector 选择器
 * @param { boolean } [all] 是否获取所有节点
 * @param { HTMLElement | Document } [currentNode] 在哪个节点下查找
 */
export function findElement(selector: string | string[]): HTMLElement | null
export function findElement<T extends boolean | HTMLElement>(
  selector: string | string[],
  all?: T,
  currentNode?: HTMLElement | Document,
): T extends true ? NodeListOf<Element> | undefined : HTMLElement | null

export function findElement(
  selector: string | string[],
  all: boolean | HTMLElement = false,
  currentNode: HTMLElement | Document = document,
) {
  if (isNull(all))
    return
  if (!isBool(all)) {
    currentNode = all as unknown as HTMLElement
    all = false
  }
  if (isArray(selector)) {
    return selector.reduce((result, c) => {
      const item = all
        ? currentNode.querySelectorAll(c)
        : currentNode.querySelector(c)
      if (!item)
        return result
      return (result = all
        ? [...result, ...(item as unknown as Element[])]
        : [...result, item as unknown as Element])
    }, [] as Element[])
  }

  return all
    ? (currentNode.querySelectorAll(selector) as
        | NodeListOf<Element>
        | undefined)
    : (currentNode.querySelector(selector) as HTMLElement | null)
}

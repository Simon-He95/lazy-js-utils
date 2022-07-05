import { isArray } from './isArray'
import { createElement } from './createElement'

export function preload(list: string[] | string) {
  const imageNode = createElement('img') as HTMLImageElement
  if (isArray(list))
    (list as string[]).forEach(src => createImage(imageNode, src))
  else
    createImage(imageNode, list as string)
}

function createImage(imageNode: HTMLImageElement, src: string) {
  const image = imageNode.cloneNode() as HTMLImageElement
  image.src = src
}

import { isArray } from './isArray'
import { createElement } from './createElement'

export function preload(list: string[] | string, style?: string) {
  const imageNode = createElement('img') as HTMLImageElement
  if (!isArray(list))
    list = [list as string]
  return (list as string[]).map(src => createImage(imageNode, src))
  function createImage(imageNode: HTMLImageElement, src: string) {
    const image = imageNode.cloneNode() as HTMLImageElement
    image.src = src
    if (style)
      image.setAttribute('style', style)
    return image
  }
}

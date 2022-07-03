import { isArray } from './isArray'
import { createElement } from './createElement'

export function preload(list: string[] | string) {
  if (isArray(list))
    (list as string[]).forEach(src => createImage(src))
  else
    createImage(list as string)
}

function createImage(src: string) {
  createElement('img', {
    src,
  })
}

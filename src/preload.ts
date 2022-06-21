import { isArray } from "./isArray";

export function preload(list: string[] | string) {
  if (isArray(list))
    (list as string[]).forEach(src => createImage(src))
  else
    createImage(list as string)
}

function createImage(src: string) {
  const image = new Image()
  image.src = src
}

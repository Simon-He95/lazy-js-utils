import { isStr } from './isStr'
import { preload } from './preload'
import { addEventListener } from './addEventListener'
import { createElement } from './createElement'
import { isNum } from './isNum'
import { findElement } from './findElement'

export function waterfall(imageList: string[], container: string | HTMLElement | number, width = 200, space = 20) {
  let mounted = false
  let hasMounted = false
  if (isNum(container)) {
    width = container as number
    container = 'body'
  }
  if (!container)
    container = 'body'
  if (isStr(container))
    container = findElement(container) || container
  if (isStr(container))
    throw new Error(`${container} is not a HTMLElement`)
  const imagesElement = preload(imageList, `width:${width}px;position:absolute;`)
  const wrapper = createElement('div', {
    id: 'simon-waterfall',
    style: 'position:relative;width:100%;height:100%;',
  })

  update()
  addEventListener(window, 'resize', () => {
    hasMounted = false
    update()
  })
  async function update() {
    if (hasMounted)
      return

    if (isStr(container) && !mounted)
      return mounted = true
    if (isStr(container))
      throw new Error(`${container} is not a HTMLElement`)
    const realWidth = width + space
    const n = Math.floor((container as HTMLElement).offsetWidth / realWidth)
    const H = new Array(n).fill(0)
    function resize(images: HTMLImageElement[]) {
      return images.map((image) => {
        const tag = H.indexOf(Math.min(...H))
        const h = image.height * width / image.width
        image.style.left = `${tag * realWidth}px`
        image.style.top = `${H[tag]}px`
        H[tag] += h + space
        return image
      })
    }
    function promiseElements(): Promise<HTMLImageElement[]> {
      return new Promise((resolve) => {
        const result: HTMLImageElement[] = []
        let count = imagesElement.length
        imagesElement.forEach((image, idx) => {
          if (!image.complete) {
            image.onload = () => {
              count--
              result[idx] = image
              if (count === 0)
                resolve(resize(result))
            }
          }
          else {
            count--
            result[idx] = image
            if (count === 0)
              resolve(resize(result))
          }
        })
      })
    }
    (await promiseElements()).forEach(image => wrapper.appendChild(image))
    removeWrapper(container as HTMLElement);
    (container as HTMLElement).appendChild(wrapper)
    hasMounted = true
  }

  return (imageList: string[]) => {
    const appendElement = preload(imageList, `width:${width}px;position:absolute;`)
    imagesElement.push(...appendElement)
    hasMounted = false
    update()
  }

  function removeWrapper(container: HTMLElement) {
    for (let i = 0; i < container.children.length; i++) {
      if (container.children[i].id === 'simon-waterfall')
        return container.removeChild(container.children[i])
    }
  }
}

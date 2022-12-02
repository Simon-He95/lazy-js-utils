import { preload } from './preload'
import { useEventListener } from './useEventListener'
import { createElement } from './createElement'
import { isNum } from './isNum'
import { mount } from './mount'

export function waterfall(imageList: string[], target: string | HTMLElement | number, width = 200, space = 20) {
  if (isNum(target)) {
    width = target as number
    target = 'body'
  }
  if (!target)
    target = 'body'
  const imagesElement = preload(imageList, `width:${width}px;position:absolute;`)
  const wrapper = createElement('div', {
    id: 'simon-waterfall',
    style: 'position:relative;width:100%;height:100%;',
  })

  useEventListener(window, 'resize', () => update(target as HTMLElement))

  async function update(container: Element) {
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
  }
  mount(target, container => update(target = container as HTMLElement))

  return (imageList: string[]) => {
    const appendElement = preload(imageList, `width:${width}px;position:absolute;`)
    imagesElement.push(...appendElement)
    update(target as HTMLElement)
  }

  function removeWrapper(container: HTMLElement) {
    for (let i = 0; i < container.children.length; i++) {
      if (container.children[i].id === 'simon-waterfall')
        return container.removeChild(container.children[i])
    }
  }
}

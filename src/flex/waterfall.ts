import { preload } from '../perf/preload'
import { createElement } from '../event/createElement'
import { useEventListener } from '../event/useEventListener'
import { isNum } from '../is/isNum'
import { mount } from '../utils/mount'
import type { MaybeElement } from '../types'

/**
 * 创建图片瀑布流并挂载到目标容器
 * @description EN: Create a simple waterfall (masonry) layout for images and mount it into the target container. Returns an `append` function to add more images.
 * @param { string[] } imageList 图片 URL 列表
 * @param { MaybeElement | number } target 目标容器或直接传入宽度（当传数字时表示宽度并默认挂载到 body）
 * @param { number } width 图片显示宽度（像素），默认为 200
 * @param { number } space 图片间距（像素），默认 20
 * @returns {(imageList: string[]) => void} 返回一个函数，用于追加更多图片到瀑布流
 */
export function waterfall(
  imageList: string[],
  target: MaybeElement | number,
  width = 200,
  space = 20,
) {
  if (isNum(target)) {
    width = target as number
    target = 'body'
  }
  if (!target)
    target = 'body'
  const imagesElement = preload(
    imageList,
    `width:${width}px;position:absolute;`,
  )
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
        const h = (image.height * width) / image.width
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
    ;(await promiseElements()).forEach(image => wrapper.appendChild(image))
    removeWrapper(container as HTMLElement)
    ;(container as HTMLElement).appendChild(wrapper)
  }
  mount(target, container => update((target = container as HTMLElement)))

  return (imageList: string[]) => {
    const appendElement = preload(
      imageList,
      `width:${width}px;position:absolute;`,
    )
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

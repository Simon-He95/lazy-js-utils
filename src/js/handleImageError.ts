/**
 * 图片加载失败时轮换备用图
 * @description EN: Return an error handler that swaps an image's `src` with fallback URLs each time a load failure occurs.
 * @param { string[] } errorImageSrc 备用图片地址列表
 * @returns { (event: Event) => void }
 */
export function handleImageError(errorImageSrc: string[]) {
  let index = 0
  const max = errorImageSrc.length - 1
  return (event: Event) => {
    if (index > max)
      return
    const target = event.target as HTMLImageElement
    target.src = errorImageSrc[index]
    index++
  }
}

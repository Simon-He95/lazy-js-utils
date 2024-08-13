/**
 * handleImageError
 * @param errorImageSrc string[] - Array of image sources to use as fallback
 * @returns (event: Event) => void - Function to handle error event on image element
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

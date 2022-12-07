export function isSupportWebp(): boolean {
  try {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  catch (error) {
    return false
  }
}

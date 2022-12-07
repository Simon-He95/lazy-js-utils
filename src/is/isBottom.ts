export function isBottom(distance = 0): boolean {
  try {
    return document.documentElement.clientHeight + window.scrollY + distance
      >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  }
  catch (error: any) {
    throw new Error(error)
  }
}

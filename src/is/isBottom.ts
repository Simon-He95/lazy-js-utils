/**
 * Determine whether the document is scrolled to the bottom (within `distance`).
 * @description EN: Returns true when the document scroll position is at or near the bottom.
 * @param {number} [distance] Additional threshold in pixels.
 * @returns {boolean}
 */
export function isBottom(distance = 0): boolean {
  try {
    return (
      document.documentElement.clientHeight + window.scrollY + distance
      >= (document.documentElement.scrollHeight
        || document.documentElement.clientHeight)
    )
  }
  catch (error: any) {
    throw new Error(error)
  }
}

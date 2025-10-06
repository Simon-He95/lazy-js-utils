/**
 * Create a DOM Text node from a string.
 *
 * @param {string} text Text content.
 * @returns {Text} A DOM Text node.
 */
export function createTextNode(text: string) {
  return document.createTextNode(text)
}

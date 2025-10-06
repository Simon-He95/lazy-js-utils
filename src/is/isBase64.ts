/**
 * Check whether a string is a base64 data URL.
 *
 * @description EN: Validate whether a string is a data URL that contains base64-encoded content.
 * @param {string} base64 Candidate string.
 * @returns {boolean} True when the string looks like a base64 data URL.
 */
export function isBase64(base64: string) {
  return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([\w!$&',()*+;=\-.~:@/?%\s]*?)\s*/i.test(
    base64,
  )
}

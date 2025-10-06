/**
 * Insert newValue into str at the given index (string splice).
 *
 * @param str - original string
 * @param index - insertion index
 * @param newValue - string to insert
 * @returns new string with newValue inserted
 * @description EN: Insert a substring into a string at the specified index and return the new string.
 */
export function splice(str: string, index: number, newValue: string) {
  return `${str.slice(0, index)}${newValue}${str.slice(index)}`
}

export function splice(str: string, index: number, newValue: string) {
  return `${str.slice(0, index)}${newValue}${str.slice(index)}`
}

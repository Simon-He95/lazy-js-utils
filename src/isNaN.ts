export function isNaN(o: any): boolean {
  return typeof o !== 'number'
    ? false
    : isNaN(o)
}

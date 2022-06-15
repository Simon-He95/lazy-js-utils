export function isReg(o: any): boolean {
  return typeof o === 'object' && o.constructor === RegExp
}

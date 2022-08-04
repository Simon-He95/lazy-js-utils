export function isSymbol(o: any): o is symbol {
  return typeof o === 'symbol'
}

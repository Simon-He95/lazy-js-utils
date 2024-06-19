export function executeStr(str: string): any {
  return new Function(`return (${str})`)()
}

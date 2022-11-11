export function isESModule(obj: any): obj is { default: any } {
  return obj.__esModule || obj[Symbol.toStringTag] === 'Module'
}

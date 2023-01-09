const NUM = /[0-9]+$/
export function isVersion(version: string) {
  return version.split('.').every(v => NUM.test(v))
}

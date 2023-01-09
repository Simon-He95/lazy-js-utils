const NUM = /^[0-9]+$/
export function isVersion(version: string) {
  return version.split('.').every(v => NUM.test(v))
}

// console.log(isVersion('0.0.1'));

const NUM = /^\d+$/

/**
 * 判断是否是版本号
 */
export function isVersion(version: string) {
  return version.split('.').every(v => NUM.test(v))
}

// console.log(isVersion('0.0.1'));

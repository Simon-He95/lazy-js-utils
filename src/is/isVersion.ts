const NUM = /^\d+$/

/**
 * 判断是否为版本号
 * @description EN: Check whether a version string consists of dot-separated numeric parts.
 * @param {string} version Version string, e.g. '1.2.3'.
 * @returns {boolean}
 */
export function isVersion(version: string) {
  return version.split('.').every(v => NUM.test(v))
}

// console.log(isVersion('0.0.1'));

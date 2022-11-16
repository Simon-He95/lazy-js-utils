const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string,
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix)
    cls += `-${blockSuffix}`

  if (element)
    cls += `__${element}`

  if (modifier)
    cls += `--${modifier}`

  return cls
}

export const useNamespace = (defaultNamespace: string) => (block: string) => {
  const namespace = defaultNamespace
  // -xx
  const b = (blockSuffix = '') =>
    _bem(namespace, block, blockSuffix, '', '')
  // __xx
  const e = (element?: string) =>
    element ? _bem(namespace, block, '', element, '') : ''
  // --xx
  const m = (modifier?: string) =>
    modifier ? _bem(namespace, block, '', '', modifier) : ''
  // -xx__yy
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace, block, blockSuffix, element, '')
      : ''
  // _xx--yy
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace, block, '', element, modifier)
      : ''
  // -xx--yy
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace, block, blockSuffix, '', modifier)
      : ''
  // -xx__yy--zz
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace, block, blockSuffix, element, modifier)
      : ''
  // is-xx
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `is-${name}` : ''
  }

  // for css var
  // --vi-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key])
        styles[`--${namespace}-${key}`] = object[key]
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key])
        styles[`--${namespace}-${block}-${key}`] = object[key]
    }
    return styles
  }

  const cssVarName = (name: string) => `--${namespace}-${name}`
  const cssVarBlockName = (name: string) =>
    `--${namespace}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}

// const namespace = useNamespace('vi')
// const button = namespace('button')
// button.b('primary')// vi-btn-primary

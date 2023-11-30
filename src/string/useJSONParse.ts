const keyReg = /\s+(?!['"])([\w_\-\$\.]+):/gm
const valueReg = /:\s*'([^']*)'/g
const commaLackReg = /:\s*("[\w_\-\$\.]+")\s*(?!,)"/gm
const commaMoreReg = /:\s*("[\w_\-\$\.]+"\s*,)\s*}/gm
const moreCommaReg = /,(\s*})/gm
/**
 * 将字符串转为JSON.stringify的格式并parse出结果
 * @param { string } str 字符串
 * @returns
 */
export function useJSONParse(str: string) {
  try {
    return JSON.parse(
      str
        .replace(keyReg, (match, key) => match.replace(key, `"${key}"`))
        .replace(valueReg, ': "$1"')
        .replace(commaLackReg, (match, value) =>
          match.replace(value, `${value},`),
        )
        .replace(commaMoreReg, (match) => match.replace(',', ''))
        .replace(moreCommaReg, (_, v) => v),
    )
  } catch (_) {
    str = str.trim().replace(/(\/\*[\s\S]*?\*\/|\/\/.*)/g, '')
    if (str.endsWith(';')) str = str.slice(0, -1)
    return str
      .slice(1, -1)
      .replace(/\n+/g, '\n')
      .replaceAll('\t', '')
      .replaceAll('\r', '')
      .replace(/\:\s*{([^\}]*)}/g, (_, v) => {
        return _.replace(v, v.replace(/\n/g, ''))
      })
      .split(',\n')
      .reduce((result, item: string) => {
        item = item.trim()
        if (!item) return result
        const items = item.split(':') as string[]
        const [key, val] = [items[0], items.slice(1).join(':')]
        const newVal = val.replace(/\n/g, '').replace(/\s+/g, ' ').trim()
        result[key.trim()] = newVal.endsWith(',') ? newVal.slice(0, -1) : newVal
        return result
      }, {} as any)
  }
}

const data = `{
  defaultFullscreen: { type: Boolean },
  // Can it be full screen
  canFullscreen: { type: Boolean, default: true },
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: { type: Number, default: 0 },
  // Warm reminder message
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: { type: Boolean, default: true },
  loading: { type: Boolean },
  loadingTip: { type: String },
  /**
   * @description: Show close button
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * @description: Show confirmation button
   */
  showOkBtn: { type: Boolean, default: true },

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  afterClose: Function as PropType<() => Promise<VueNode>>,

  bodyStyle: Object as PropType<CSSProperties>,

  closable: { type: Boolean, default: true },

  closeIcon: Object as PropType<VueNode>,

  confirmLoading: { type: Boolean },

  destroyOnClose: { type: Boolean },

  footer: Object as PropType<VueNode>,

  getContainer: Function as PropType<() => any>,

  mask: { type: Boolean, default: true },

  maskClosable: { type: Boolean, default: true },
  keyboard: { type: Boolean, default: true },

  maskStyle: Object as PropType<CSSProperties>,

  okType: { type: String, default: 'primary' },

  okButtonProps: Object as PropType<ButtonProps>,

  cancelButtonProps: Object as PropType<ButtonProps>,

  title: { type: String },

  open: { type: Boolean },

  width: [String, Number] as PropType<string | number>,

  wrapClassName: { type: String },

  zIndex: { type: Number },
};`

console.log(useJSONParse(data)) // { name: 'simon', age: '14' }

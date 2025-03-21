import { isUndef } from '../is/isUndef'
import type { DeviceType } from '../types'

/**
 * 设备信息缓存
 */
let deviceCache: DeviceType | null = null

/**
 * 获取当前环境设备信息 os 手机设备 dev 浏览器环境
 * @returns {DeviceType} 设备信息
 */
export function getDevice(): DeviceType {
  // 如果已有缓存，直接返回
  if (deviceCache)
    return deviceCache

  // 检查是否在浏览器环境中
  if (isUndef(navigator)) {
    return { os: 'unknown', dev: 'unknown' }
  }

  const u = navigator.userAgent
  const getBrowser = () => {
    const bws = [
      {
        name: 'sgssapp',
        it: /sogousearch/i.test(u),
      },
      {
        name: 'wechat',
        it: /MicroMessenger/i.test(u),
      },
      {
        name: 'weibo',
        it: !!u.match(/Weibo/i),
      },
      {
        name: 'uc',
        it: !!u.match(/UCBrowser/i) || u.includes(' UBrowser'),
      },
      {
        name: 'sogou',
        it: u.includes('MetaSr') || u.includes('Sogou'),
      },
      {
        name: 'xiaomi',
        it: u.includes('MiuiBrowser'),
      },
      {
        name: 'baidu',
        it: u.includes('Baidu') || u.includes('BIDUBrowser'),
      },
      {
        name: '360',
        it: u.includes('360EE') || u.includes('360SE'),
      },
      {
        name: '2345',
        it: u.includes('2345Explorer'),
      },
      {
        name: 'edge',
        it: u.includes('Edge'),
      },
      {
        name: 'ie11',
        it: u.includes('Trident') && u.includes('rv:11.0'),
      },
      {
        name: 'ie',
        it: u.includes('compatible') && u.includes('MSIE'),
      },
      {
        name: 'firefox',
        it: u.includes('Firefox'),
      },
      {
        name: 'safari',
        it: u.includes('Safari') && !u.includes('Chrome'),
      },
      {
        name: 'qqbrowser',
        it: u.includes('MQQBrowser') && !u.includes(' QQ'),
      },
      {
        name: 'qq',
        it: u.includes('QQ'),
      },
      {
        name: 'chrome',
        it: u.includes('Chrome') || u.includes('CriOS'),
      },
      {
        name: 'opera',
        it: u.includes('Opera') || u.includes('OPR'),
      },
    ]
    for (let i = 0; i < bws.length; i++) {
      if (bws[i].it)
        return bws[i].name
    }

    return 'other'
  }

  const getOS = () => {
    if (!!u.match(/compatible/i) || u.match(/Windows/i))
      return 'windows'
    else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i))
      return 'macOS'
    else if (!!u.match(/iphone/i) || u.match(/Ipad/i))
      return 'ios'
    else if (u.match(/android/i))
      return 'android'
    else if (u.match(/Ubuntu/i))
      return 'Ubuntu'
    else return 'other'
  }

  // 缓存并返回结果
  deviceCache = { os: getOS(), dev: getBrowser() }
  return deviceCache
}

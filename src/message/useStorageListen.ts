import { useEventListener } from '../event/useEventListener'
import { uuid } from '../random/uuid'

const union = '@simon_he/storage'

// 跨标签页通信通过storage事件实现
export function useStorageListen(
  callback: (type: string, newValue: any, oldValue: any) => void,
) {
  return useEventListener(window, 'storage', (e) => {
    const { key, newValue, oldValue } = e
    const type = key?.startsWith(union) ? key.slice(union.length) : key!
    callback(type, newValue, oldValue)
  })
}

// 修改storage
export function sendStorage(type: string, value: any) {
  localStorage.setItem(
    union + type,
    JSON.stringify({
      value,
      __temp: uuid(6),
    }),
  )
}

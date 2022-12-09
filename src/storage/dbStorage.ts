export function dbStorage() {
  return new Promise((resolve, reject) => {
    const indexDB
      = window.indexedDB
      || window.webkitIndexedDB
      || window.mozIndexedDB
      || window.msIndexedDB
    if (!indexDB)
      reject(new Error('浏览器不支持indexedDB'))

    const request = indexDB.open('simon')
    request.onerror = function () {
      reject(new Error('数据库打开失败'))
    }
    let objectStore: any
    request.onsuccess = function (event: any) {
      const db = event?.target?.result
      objectStore = db
        .transaction(['simonDb'], 'readwrite')
        .objectStore('simonDb')
      function read(key: any) {
        return new Promise((resolve, reject) => {
          const request = objectStore.get(key)
          request.onsuccess = function () {
            resolve(request.result)
          }
          request.onerror = function (event: any) {
            reject(new Error(event))
          }
        })
      }
      function update(
        data: Record<string, any>,
        resolve: (msg: string) => void,
        reject: (error: Error) => void,
      ) {
        const request = objectStore.put(data)

        request.onsuccess = function () {
          resolve('数据更新成功')
        }

        request.onerror = function () {
          reject(new Error('数据更新失败'))
        }
      }

      resolve({
        async set(key: string | number, value: Record<string, any> = {}) {
          const hasKey = await read(value.key || key)
          return new Promise((resolve, reject) => {
            value.key = key
            if (hasKey)
              return update(value, resolve, reject)
            const request = objectStore.add(value)
            request.onsuccess = function () {
              resolve('添加成功')
            }
            request.onerror = function () {
              reject(new Error('添加失败'))
            }
          })
        },
        read,
        remove(key: any) {
          return new Promise((resolve, reject) => {
            const request = objectStore.delete(key)
            request.onsuccess = function () {
              resolve('删除成功')
            }
            request.onerror = function () {
              reject(new Error('删除失败'))
            }
          })
        },
      })
    }
    request.onupgradeneeded = function (event: any) {
      const db = event?.target?.result
      if (!db.objectStoreNames.contains('simonDb'))
        db.createObjectStore('simonDb', { keyPath: 'key' })
    }
  })
}

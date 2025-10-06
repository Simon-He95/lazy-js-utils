/**
 *
 * @param { boolean } [enableHighAccuracy] 开启高精度模式 默认 false
 * @param { number } [timeout] 超时时间 默认 5000
 * @param { number } [maximumAge] 最大缓存位置时间 默认 0
 * @returns
 * @description EN: Get current geolocation coordinates as a Promise, with optional high-accuracy and timeout settings.
 */
export function getLocation(
  enableHighAccuracy = false,
  timeout = 5000,
  maximumAge = 0,
): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition(resolve),
        showError(reject),
        {
          enableHighAccuracy,
          maximumAge,
          timeout,
        },
      )
    }
    else {
      reject(new Error('该浏览器不支持定位功能！'))
    }
  })
}

function showPosition(resolve: Function) {
  return function (position: GeolocationPosition) {
    resolve(position.coords)
  }
}

function showError(reject: Function) {
  return function showError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return reject(new Error('用户不允许使用位置服务'))
      case error.POSITION_UNAVAILABLE:
        return reject(new Error('位置信息不可用'))
      case error.TIMEOUT:
        return reject(new Error('请求获取用户位置超时'))
      default:
        return reject(new Error('未知错误'))
    }
  }
}

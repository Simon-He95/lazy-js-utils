## [docs](https://www.hejian.club/posts/toolsfunction)

## 工具函数
- deepCompare  // 比较2个对象的差异返回不同的属性和具体不同的值 params: {obj1: any, obj2: any, ignoreKeys: string[] | RegExp}
- deepMerge  // Object.assign的深度拷贝版本，返回合并后传入的第一个对象 params: {target: Record<any, any>, ...sources: Record<any, any>[]} => target
- asyncPool  // limit：控制异步并发执行的数量，tasks：异步任务数组
- quickFind  // quickFind(array: any[], key: any),返回一个新的实例,在实例中find方法可以根据key查找对应的项,查找效率O(1),set更新或新增项,delete删除项效率都是O(1)
- quickFilter  // quickFilter(array: any[], key: string | number | Array<string | number>, value: string | number | RegExp), 快速模糊查找key名字的项,支持正则匹配
- deepClone  // 简洁的深拷贝
- curry  // 函数柯里化
- memorizeFn  // 根据参数返回一个有缓存的函数
- debounce  // 函数防抖
- throttle  // 函数节流
- traverse  // 遍历对象或数组,快速从options中得到指定的属性值,traverse(arr, {
      'family.name'(target: any, index: number) {
        console.log(target, index,)
      }
    })
- transformKey  // 将对象的key转换成需要的key,transformKey(obj, {
      'family.name': 'familyName',
      'family.age': 'familyAge'
    })
- isStr  // 判断是否是字符串
- isNum  // 判断是否是数字
- isPlainObject  // 判断是否是对象
- isArray  // 判断是否是数组
- isFn  // 判断是否是函数
- isUndef  // 判断是否是undefined
- isNull  // 判断是否是null
- isPromise  // 判断是否是Promise
- isSymbol  // 判断是否是Symbol
- isNaN  // 判断是否是NaN
- isReg  // 判断是否是正则表达式
- isDate // 判断是否是日期
- isMobile // 判断是否是手机号
- isEmail // 判断是否是邮箱
- isIdCard // 判断是否是身份证
- vFetch  // 基于fetch的axios api式请求封装  type VFetchConfig = {
  url: string // 请求地址
  baseURL?: string // 基础url
  body?: any // body参数 {},GET请求会合并到url后面
  method?: Method // 请求类型 默认GET 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' 支持vFetch.get | post | delete | put的形式
  headers?: Record<string, any> // 请求头 例如: {'Content-Type': 'application/json'}  
  credentials?: Credentials // 请求是否带上cookie 默认omit 'include' | 'same-origin' | 'omit' 
  params?: Record<string, string> // 请求参数 根据bodyType决定是否会被序列化
  timeout?: number // 超时时间 ms 默认为20000
  responseType?: ResponseType // 返回类型 默认json 'formData' | 'text' | 'blob' | 'arrayBuffer' | 'json'
  bodyType?: BodyType // 请求类型 默认json 'json' | 'form' | 'file' 
  cache?: Cache // 缓存类型 默认不缓存 'no-cache' | 'default' | 'force-cache' | 'only-if-cached' 
  redirect?: Redirect // 重定向 默认follow follow：跟随重定向，error：抛出错误，manual：手动处理
  mode?: Mode // cors, no-cors, same-origin 默认cors cors：跨域，no-cors：不跨域，same-origin：同源
  transformResponse?: (response: Response) => Response // 响应数据转换
}
- parse // parse('user=simon&age=18') => { user: 'simon', age: '18' }
- stringify // stringify({ user: 'simon', age: '18' }) => 'user=simon&age=18'
- interceptError  // 自动捕获传入函数执行的异常
- jsCookie // cookie操作 jsCookie.set('name', 'simon') jsCookie.get('name') => 'simon' jsCookie.remove('name')  jsCookie.get('name') => ''
- uuid // 生成uuid 支持限制生成的uuid长度和类型 uuid(16, 'hex') => 'a0b1c2d3e4f5' uuid(8, 2) => '11110011' uuid() => '71A793A9-BBAE-49FC-B957-5BC71E5AD044'
- formateData // 格式化日期 formateData(new Date(), 'yyyy-MM-dd') => '2019-01-01'
- monitorPef // 数字化浏览器性能指标: 重定向时间 重定向次数 首屏时间 上一页卸载时间 浏览器读取缓存时间 DNS解析时间 TCP完成握手时间 HTTP请求响应完成时间 DOM开始加载前所花费时间 DOM加载完成时间 脚本加载时间 onload事件时间 页面完全加载时间 
- getLocation // 基于promise封装的获取地理位置信息 params: { enableHighAccuracy: boolean = false, timeout: number = 5000, maximumAge: number = 0 } 1.高精度 2.超时时间 3.缓存时间
- getDevice() // 获取系统信息{ os: 'android', dev: 'chrome' } 
- preload(list: string[] | string)  // 预加载图片
- addScript(src: string) // 动态添加script
- download(url) // 下载文件
- trim(s: string, type: TrimType = 'around') // 字符串去除空格 前空格 后空格 前后空格 所有空格 type: 'pre' | 'post' | 'around' | 'all'
- compressCss // 压缩css
- addStyle(s: string) // 动态添加style
- scrollToTop // 滚动到顶部
- createEventBus // 创建发布订阅模式的实例
- once(fn: Function) // 只执行一次函数
- randomHexColor() // 生成随机十六进制颜色
- httpsRedirect() // https重定向
- scrollToView(e: Element | string) // 滚动到指定元素
- getScrollPosition() => { x,y }// 获取滚动位置
- camelize(s: string) // 驼峰化字符串
- hyphenate(s: string) // 驼峰转-连接字符串
- getUrlParam(name: string) // 获取url参数 默认获取当前浏览器地址栏参数
- fullScreen()  // 全屏
- exitFullScreen() // 退出全屏
- toBase64(o: File | string, type: FileType = 'url') // 转base64格式 type支持'url' | 'blob' | 'file'
- base64ToFile(s: string, name: string) // base64转文件
- base64ToBlob(s: string) // base64转blob
- uppercaseNum(num: number) // 转换为大写数字
- formateNum(number: number | string, decimals = 2, integer: 'floor' | 'ceil' = 'ceil') // 格式化数字 number:数字 decimals:保留小数位数 integer:取整方式 向下取整 向上取整 'floor' | 'ceil'



## 使用方法
### deepMerge
![deepMerge](assets/deepMerge.png)
### deepCompare
![deepCompare](assets/deepCompare.png)
### asyncPool
![asyncPool](assets/asyncPool.png)
### quickFind
![quickFind](assets/quickFind.png)
### quickFilter
![quickFilter](assets/quickFilter.png)
### deepClone
![deepClone](assets/deepClone.png)
### curry
![curry](assets/curry.png)
### memorizeFn
![memorizeFn](assets/memorizeFn.png)
### debounce
![debounce](assets/debounce.png)
### throttle
![throttle](assets/throttle.png)
### traverse
![traverse](assets/traverse.png)
### transformKey
![transformKey](assets/transformKey.png)
### vFetch
![vFetch](assets/vFetch.png)


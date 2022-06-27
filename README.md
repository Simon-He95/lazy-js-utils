## [docs](https://www.hejian.club/posts/toolsfunction)

## 此文是介绍封装的工具函数的文档[simon-js-tool](https://www.npmjs.com/package/simon-js-tool)
目前整理了<strong>60+</strong>的常用函数,还在持续更新中...

## 使用说明
```bash
npm i simon-js-tool # 安装

import { 
  deepCompare
 } from 'simon-js-tool' # 按需引入

```

## CreateSignatureCanvas
- 生成一个签名的canvas模板
```javascript
const signature = new CreateSignatureCanvas(400, 400)
document.body.appendChild(signature.canvas)
const base64 = signature.save()
signature.clear() // 清除签名
```

## DotTextCanvas
- 根据文字返回一个点阵的canvas
- 入参：text: string // 内容, fontSize: number // 文字大小, color: string // 颜色, fontWeight: number  // 字体粗细
```javascript
const dotText = DotTextCanvas('hello', 20, '#000', 1)
document.body.appendChild(dotText.canvas)
```

## getLru
- 记录有限的数据,删除最久未访问的数据
- 参数: maxSize, 存储的最大数据量 (默认为50)
```javascript
const lru = getLru(2)
lru.set('a', 1)
lru.set('b', 2)
lru.get('a') // 1
lru.set('b', 3)
lru.cache.size // 2
lru.get('a') // 1
lru.get('b') // undefined
```

## escapeHtml
- 将html字符串转换为实体字符串
```javascript
excapeHtml("< a href=" ">xx</ a>") // "&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;"
```

## unescapeHtml
- 将实体字符串转换为html字符串
```javascript
unescapeHtml('&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;') // "< a href=" ">xx</ a>"
```

## timeCost
- 计算函数执行时间
- timeCost(fn: Function) : number
```javascript
timeCost(()=>{
  for(let i=0;i<1000;i++){
    console.log(i)
  }
}) // 输出: timeCost: 0.046s
```

## log
- 简化console.log的使用
- log(s: string,color: string,fontSize: number)
```javascript
log('hello world') # 打印日志
```

## copy
- js控制复制的内容
- copy(str: string): boolean # 成功返回true,失败返回false
```javascript
btn.onclick = () =>  {
  if(copy(textarea.value)){
    alert('复制成功')
  }
}
```

## getDateList
- 获取指定日期范围内正负多少天的日期列表
- getDateList(start: string, day: number = 0) start: 开始日期以/或-分割 1991/03/02 1001-03-02, day: 正负多少天

```javascript
getDateList('1991/3/02', 7)
// [ '1991-3-02', '1991-3-03', '1991-3-04', '1991-3-05', '1991-3-06', '1991-3-07', '1991-3-08' ]
```

## isType
- `isType(o:any, type:string)`: 判断obj是否是type类型
- 混合类型判断,type 如果是多种类型,用'|'分隔 如: 缩写 - 'O|S'  全写 - 'Object|String' 
```javascript
isType(1, 'Number') // true
isType('1', 'N') // false
isType({}, 'O | A') // true (Object | Array)
isType(new Promise(), 'P') // true (Promise)
isType(function(){}, 'P | F') // true (Promise | Function)
```

## randomDate
- 随机生成日期
- 可指定随机范围 start:'1999/01/01' end:'2099/12/31'
```javascript
// end默认是当前日期
randomDate('1999/01/01') // Mon Jun 06 2011 15:11:37 GMT+0800 (中国标准时间) 可再通过formateDate转换为其他格式 如'yyyy-MM-dd'
```

## uniqueArray
- 去除数组中重复的元素
- 支持去除数组中的对象的重复元素
```javascript
const array = [
      {
        name: "simon",
        age: "19",
        hobby: ['1', '2', '3']
      },
      {
        name: "simon",
        age: "19",
        hobby: ['1', '2', '3']
      },
    ]
    uniqueArray(array) => [
      {
        name: "simon",
        age: "19",
        hobby: ['1', '2', '3']
      }
    ]
```

## deepCompare 
- ignoreKeys忽略指定的keys可以为数组或者正则表达式
- 比较2个对象的差异返回不同的属性和具体不同的值
- 返回{error:[],errorMsg:[]} 格式,error对应的是不同的属性，errorMsg对应的是不同的属性的不同的值和位置
- 如果两个对象相同，则返回{error:[],errorMsg:[]}，error为空，errorMsg为空
```javascript
// params: { obj1: any, obj2: any, ignoreKeys: string[] | RegExp }
const obj1 = {a:1,b:2,c:3}
const obj2 = {a:1,b:2,c:3}
const obj3 = {a:1,b:2,c:4}
deepCompare(obj1,obj2) // {error:[],errorMsg:[]}
deepCompare(obj1,obj3) // {error:['c'],errorMsg:['3','4']}
```
## deepMerge 
- Object.assign的深度拷贝版本
- 可以接受多个参数，存在相同层级的相同属性，后者覆盖前者
- 返回第一个对象
```javascript
// params:  params: { target: Record<any, any>, ...sources: Record<any, any>[] } => target
const target = { a: 1, b: 2, c: { d: 3, e: 4 } }
const source1 = { b: 4, c: { d: 5 } }
const source2 = { c: { e: 6 } }
const result = deepMerge(target, source1, source2)
console.log(result) // { a: 1, b: 4, c: { d: 5, e: 6 } }
```
## asyncPool 
- 控制异步并发执行的数量
- 参数： limit-控制异步并发执行的数量，tasks-异步任务数组
```js
// limit 并发数量 , tasks httpRequest[]
asyncPool(limit, tasks).then((results) => {
  // results is an array of results
})
```

## quickFind 
-  quickFind(array: any[], key: any) ,返回一个新的实例
- 在实例中find方法可以根据key查找对应的项-O(1)
- set更新或新增项-O(1)
- delete删除项-O(1)
```javascript
const find = quickFind([{id:1,name:'simon'},{id:2,name:'simon'},'id'])
find.find(1)
find.set({id:1,name:'simon'})
find.delete(1)
```
## quickFilter 
- 快速模糊查找key名字的项和值 如: 'name=/h/'
```javascript
// quickFilter(array: any[], key: string | Array<string>)
    const arr = [
      {
        name: 'simon',
        age: 18,
        id: 0,
      },
      {
        name: 'simon5',
        age: 49,
        id: 3,
      },
      {
        name: "hi"
      },
      {
        name: "hi",
        age: "2",
        en: "0"
      }
    ]
 quickFilter(arr,['id=22', 'name=simon5']) // [{"age": 39,"id": 22,"name": "simon3"},{"age": 9,"id": 3,"name": "simon5"}]
 quickFilter(arr,['name=/h/']) // [{"age": "2","en": "0","name": "hi"},{"name": "hi"}]
```
## deepClone 
- 支持循环依赖
- 支持复杂类型
- 轻量级的深拷贝
```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
}
obj.self = obj
const obj2 = deepClone(obj)
```
## curry 
- 函数柯里化
```javascript
const add = (a, b) => a + b
const add1 = curry(add)
const add2 = add1(1)
const add3 = add2(2)
add3(3) // 6
```

## memorizeFn 
- 根据参数返回一个能缓存结果的函数
- 参数：fn-需要缓存的函数
```javascript
let count = 0
const fn = memorizeFn(()=> count++)
fn()
fn()
count => 1
```

## debounce 
-  函数防抖
-  参数：fn-需要防抖的函数，delay-防抖的时间
```javascript
const f = debounce(() => {
  console.log('debounce')
}, 1000)
```
## throttle 
- 函数节流
- 参数：fn-要节流的函数, delay-节流时间
``` javascript
  const f = throttle(() => {
    console.log('throttle')
  }, 1000)
```

## traverse 
- 遍历对象或数组,快速从options中函数名获取arr中的值
- 函数接收target-当前遍历的值，index-当前遍历的索引, item-当前遍历的那一项
- 可以指定多个属性
- 使用类似与babel的traverse方法
- 使用场景：快速提取数据中的某些属性,转换为新的数据结构
```javascript
// traverse(arr, { 'family.name'(target: any, index: number, item: any) { console.log(target, index) } })
const obj = {
  name: 'simon',
  age: 18,
  family: {
    name: 'simon',
    age: 18,
  },
}
traverse(obj, {
  'family.name'(target: any, index: number, item: any) {
    console.log(target, index)
  }
})
```

## transformKey 
- 支持多层级的key
- 将对象的key转换成需要的key
- 使用场景: 前端定义字段有后端不一样的key，比如后端的key是id，前端的key是_id
```javascript
// transformKey(obj, { 'family.name': 'familyName', 'family.age': 'familyAge' })
const obj = {
  family: {
    name: 'simon',
    age: 18
  },
  name: 'simon'
}
const newObj = transformKey(obj, {
  'family.name': 'familyName',
  'family.age': 'familyAge'
})
console.log(newObj)
// { familyName: 'simon', familyAge: 18, name: 'simon' }
```


## once
- 只执行一次的函数
```javascript
document.addEventListener('click', once(() => {
  console.log('click')
}))
```

## vFetch
- 基于fetch的axios api 式promise请求封装
- 支持拦截前追加headers
```javascript
type VFetchConfig = {
  url: string // 请求地址
  baseURL?: string // 基础url
  body?: any // body参数 {},GET请求会合并到url后面
  method?: Method // 请求类型 默认GET 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' 支持vFetch.get | post | delete | put的形式
  headers?: Record<string, any> // 请求头 例如: {'Content-Type': 'application/json'} 支持在请求拦截器中设置追加
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
interface Interceptors {
    request: {
      use: (successCallback // 请求前拦截处理, errorCallback // 错误处理)
    }
    response: {
      use: (successCallback // 响应后成功处理), errorCallback // 响应后失败处理)
    }
  }
  // useage
vFetch(options:Record<string,string>).then(res =>{}, err =>{})
```


## stringify
```javascript
stringify({ user: 'simon', age: '18' }) => 'user=simon&age=18'
```
## parse
```javascript
parse('user=simon&age=18') => { user: 'simon', age: '18' }
```
## jsCookie
```javascript
jsCookie.set('name', 'simon') 
jsCookie.get('name') => 'simon' 
jsCookie.remove('name')  
jsCookie.get('name') => ''
```
## uuid
- 生成uuid 
- 支持限制生成的uuid长度和类型 
```javascript
uuid() => '71A793A9-BBAE-49FC-B957-5BC71E5AD044'
uuid(16, 'hex') => 'a0b1c2d3e4f5' uuid(8, 2) => '11110011'
```
## formateDate
- 格式化日期
```javascript
formateDate(new Date(), 'yyyy-MM-dd') => '2019-01-01'
```
## monitorPef
- 数字化浏览器性能指标
- 重定向时间 重定向次数 首屏时间 上一页卸载时间 浏览器读取缓存时间 DNS解析时间 TCP完成握手时间 HTTP请求响应完成时间 DOM开始加载前所花费时间 DOM加载完成时间 脚本加载时间 onload事件时间 页面完全加载时间 
``` javascript
monitorPef() 
/*
重定向时间	0
重定向次数	0
首屏时间	414
上一页卸载时间	0
浏览器读取缓存时间	28.200000047683716
DNS解析时间	0
TCP完成握手时间	0.3097000000476837
HTTP请求响应完成时间	0.026600000143051146
DOM开始加载前所花费时间	0.36460000014305116
DOM加载完成时间	2.600299999952316
脚本加载时间	0.00040000009536743164
onload事件时间	0
页面完全加载时间	3.0144000000953675
*/
```
## getLocation
- 基于promise封装的获取地理位置信息
- params: 高精度 超时时间 缓存时间
```javascript
await getLocation() =>  { enableHighAccuracy: boolean = false, timeout: number = 5000, maximumAge: number = 0 }
```
## getDevice
- 获取系统信息
- os:系统 dev:浏览器
```javascript
getDevice() => { os: 'android', dev: 'chrome' }
```
## preload
- 预加载图片
```javascript
preload('https://img.yzcdn.cn/vant/cat.jpeg')
preload(['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/dog.jpeg'])
```

## lazyLoad
- 图片懒加载
- params-1: 图片的集合 Element | Element[] | NodeList[] | class | id | tagName 
- params-2: root 指定相对容器默认是body 
- params-3: rootMargin 指定相对容器的边距 默认距离容器底部200px时候加载(↑ → ↓ ←) '0px 0px 200px 0px' 
- params-4: threshold 指定图片加载的阈值
```javascript
// usage
  lazyLoad(document.querySelectorAll("img"));
  lazyLoad("img[data-src]");
  lazyLoad(".img-wrapper>img");
// template
  <img src="temp" data-src="../public/favicon.svg" alt="" h-10 bg-red />
```

## addScript
- 动态添加script标签放 => ead
```javascript
addScript('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js')
```
## addStyle
- 动态添加style标签 => head
```javascript
addStyle(`
  .test {
    color: red;
  }
`)
```
## download
- 下载文件
```javascript
download('https://www.baidu.com/img/bd_logo1.png', 'baidu.png')
```

## trim
- 字符串去除空格
- type: '前空格' | '后空格' | '前后空格' | '所有空格'
```javascript
trim(str: string,type: 'pre' | 'post' | 'around' | 'all' = 'around') 
trim('  h e l l o  ') => 'h e l l o'
trim('  h e l l o  ', 'pre') => 'h e l l o  '
trim('  h e l l o  ', 'post') => '  h e l l o'
trim('  h e l l o  ', 'all') => 'hello'
```

## compressCss
- 压缩css
- 参数: css: string
```javascript
compressCss(css: string) => string
```

## scrollToTop
- 回到顶部
```javascript
scrollToTop()
```

## createEventBus
- createEventBus() 
- emit 事件发送
- on 事件监听
- off 事件取消
- 创建发布订阅模式的实例

## randomHexColor
- 随机生成十六进制颜色
```javascript
randomHexColor() => '#ff0000'
```

## randomRgb
- 随机生成RGB颜色
```javascript
randomRgb() => 'rgb(255,0,0)'
```

## httpsRedirect
- https重定向
```javascript
httpsRedirect()
```

## scrollToView
- 滚动到指定元素
```javascript
scrollToView(el: HTMLElement | string)
```

## getScrollPosition
- 获取滚动位置
```javascript
getScrollPosition() => { x: number, y: number }
```

## camelize
- 驼峰化
```javascript
// hello-world
camelize(str: string) => 'helloWorld'
```

## hyphenate
- 连字符化
```javascript
// helloWorld
hyphenate(str: string) => 'hello-world'
```

## getUrlParam
- 获取url参数
- 默认不传入url，获取当前页面url参数
```javascript
getUrlParam('?name=simon&age=18') => { name: 'simon', age: '18' }
```

## fullScreen
- fullScreen()
- 全屏

## exitFullScreen
- exitFullScreen()
- 退出全屏

## toBase64
- 将blob | file | url转换为base64
```javascript
toBase64(file: File, type: 'file' | 'blob' | 'url' = 'url') => string
```

## base64ToFile
- 将base64转换为file
```javascript
base64ToFile(s: string, name: string) => File
```

## base64ToBlob
- 将base64转换为blob
```javascript
base64ToBlob(s: string) => Blob
```

## uppercaseNum
- 将数字转换为大写字母
```javascript
// 1 => '一'
uppercaseNum(num: number | string) => string
```

## formateNum
- 将数字格式化
- integer: 'floor' | 'ceil' 小数截取方式 floor:向下取整 ceil:向上取整
```javascript
// 12253.123 => 12,253.12
formateNum(number: number | string, decimals = 2, integer: 'floor' | 'ceil' = 'ceil') => string
```

## interceptError
- 异常拦截
- 参数：可能存在异常的函数，返回一个promise类型的错误处理函数
- 可以避免不断的try...catch
```javascript
// interceptError(() => { throw new Error('error') }).catch(err=>{ console.log(err) })
interceptError(fn: Function) => Promise<any>
```
## isBottom
- 判断滚动是否触底
- distance: 距离底部的距离作为触底的判断标准 默认0
```javascript
isBottom(distance: string = 0) => boolean
```

## calNum
- 计算数字
- type: '加' | '减' | '乘' | '除'
```javascript
console.log(calNum.add(0.1, 0.2, 0.2)) => 0.5
console.log(calNum.div(0.1, 0.2, 0.2)) => 2.5
console.log(calNum.sub(0.1, 0.2, 0.2)) => -0.3
console.log(calNum.mul(0.1, 0.2, 0.2)) => 0.004
```

## 规则判断
- isMobile  - 判断是否是手机号
- isEmail - 判断是否是邮箱
- isIdCard  - 判断是否是身份证
- hasCn - 判断是否含有中文
- isFile - 判断是否是File类型
- isBlob - 判断是否是Blob类型

## GitHub地址
[欢迎PR](https://github.com/Simon-He95/simon-js-tool)

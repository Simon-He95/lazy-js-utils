## [docs](https://www.hejian.club/posts/toolsfunction)

## 工具函数
- deepCompare  // 比较2个对象的差异返回不同的属性和具体不同的值
- deepMerge  // Object.assign的深度拷贝版本，返回合并后传入的第一个对象
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
- VFetch  // fetch请求封装 export interface IFetch {
  url: string
  method?: Method
  headers?: Record<string, string>
  credentials?: Credentials
  params?: Record<string, string>
  timeout?: number
  returnType?: ReturnType
  bodyType?: BodyType
  cache?: Cache
  redirect?: Redirect
  mode?: Mode
  firstThen?: (response: Response) => Response
}
- interceptError  // 自动捕获传入函数执行的异常


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


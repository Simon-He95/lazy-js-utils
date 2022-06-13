## 工具函数
- deepCompare  // 比较2个对象的差异返回不同的属性和具体不同的值
- deepMerge    // Object.assign的深度拷贝版本，返回合并后传入的第一个对象
- asyncPool   // limit：控制异步并发执行的数量，tasks：异步任务数组
- quickFind   // quickFind(array: any[], key: any),返回一个新的实例,在实例中find方法可以根据key查找对应的项,查找效率O(1),set更新或新增项,delete删除项效率都是O(1)
- quickFilter // quickFilter(array: any[], key: string | number | Array<string | number>, value: string | number | RegExp), 快速模糊查找key名字的项,支持正则匹配
- deepClone // 简洁的深拷贝
- curry // 函数柯里化
- memorizeFn // 根据参数返回一个有缓存的函数
- debounce // 函数防抖
- throttle // 函数节流

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


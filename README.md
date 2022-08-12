# simon-js-tool :tongue:

<p align="center">
<img height="200" src="./assets/kv.png" alt="simon-js-tool">
</p>
<p align="center"><a href="https://www.npmjs.com/package/simon-js-tool"><img src="https://img.shields.io/npm/v/simon-js-tool?color=3fb883&amp;label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/simon-js-tool"><img src="https://img.shields.io/npm/dm/simon-js-tool?style=social" alt="NPM version"></a>
<a href="https://github.com/Simon-He95/simon-js-tool"><img src="https://img.shields.io/github/stars/Simon-He95/simon-js-tool?style=social" alt="NPM version"></a>
</p>
<p align="center"><a href="https://www.hejian.club/posts/toolsfunction-zh">Docs</a></p>
<p align="center"> <a href="./README_en.md">English</a> | 简体中文</p>

## 此文是介绍封装的工具函数的文档[simon-js-tool](https://www.npmjs.com/package/simon-js-tool)
目前整理了<strong>90+</strong>的常用函数,还在持续更新中...,你的认可是对我最大的鼓励! :hearts:

## 🔥 亮点
- 纯js的工具函数,不依赖vue,react,angular
- dom操作的api封装,如在vue中使用是不需要onMounted获取dom节点的,可以直接使用class或者id传入
- 副作用函数,可以在函数执行的结果去stop,也会在页面销毁时被自动stop
- api设计简单、实用

## :balloon: 更多
- 导出函数 [exports-function](https://github.com/SimonHe1995/exportsFunction)
- threejs [@simon_he/s-three](https://github.com/SimonHe1995/sThree)
- Echarts [@simon_he/s-chart](https://github.com/SimonHe1995/sCharts)
- numsWheel [@simon_he/nums-wheel](https://github.com/SimonHe1995/numsWheel)
- vAxios [@simon_he/v-axios](https://github.com/SimonHe1995/vAxios)

## :coffee: 赞助我
<table>
<tr>
<td width="500" align="center">
<img width="300" src="./assets/wechat.jpg" alt="WeChat">
</td>
<td width="500" align="center">
  <img width="300" src="./assets/zfb.jpg" alt="Alipay">
</td>
</tr>
</table>

## :book: 使用说明
```bash
npm i simon-js-tool # 安装

import { 
  deepCompare
 } from 'simon-js-tool' # 按需引入

```

## jsShell
- 基于node封装的js调用shell命令
- 参数:
  - cmd: shell命令
```js
const data = jsShell('ls')
const term1 = data?.split('\n').map(item => item).join(' ')
jsShell(`gum choose  ${term1}`)
// 非常简单的就可以实现一个pick框选功能，你同样可以继续接收选择的结果，做下一步操作
// > README.md
//   README_en.md
//   assets
//   dist
//   node_modules
//   package.json
//   playground
//   pnpm-lock.yaml
//   pnpm-workspace.yaml
//   src
```

## transformVdeep
- vite-plugin
- 将`>>>` 和 `/deep/` 转换成 `:deep()`
```js
// vite.config.ts
// import { transformVdeep } from 'simon-js-tool'
// plugins: [
//   transformVdeep(),
// ]
```

## isExist
- 判断文件是否存在
```js
isExist('./README.md') // true
isExist('./a.md') // false
```

## transformArgv
- 处理命令行参数
```js
// build --minify --mode=production --type=es5
const args = transformArgv() // {minify: true, mode: 'production', type: 'es5'}
```

## getExportBundle
- 返回npm打包文件
```js
console.log(getExportBundle('vitest')) // 读取node_modules/vitest/package.json的module字段如果没有才会读取main字段, 返回打包文件的内容
```

# Canvas
- 快速拿到canvas和ctx
```js
const { canvas, ctx } = new Canvas()
```

## getResolvedPath
- 获取绝对路径
- 参数:
  - url: string 相对路径
```js
const resolvedPath = getResolvedPath('/assets/kt.png') // /mnt/d/GitHub/assets/kt.png
```

## getPkg
- 获取package.json的Object 对象
- 可使用相对路径或绝对路径
- 参数:
  - url: 路径
```js
const pkg = await getPkg('package.json')
```

## useVideo
- video的封装
- 参数:
  - sources: [] 数组,每个元素是一个对象,对象包含两个属性,一个是type,一个是src
  - options: {
      container: dom节点,播放器的容器
      controls?: true 是否使用原生播放器的controls
      width?: number 宽度
      height?: number 高度
      className?: string 播放器的className
      style?: string 播放器的style
    }
```js
// play 播放 或 暂停
// playRest 重新播放
// playRate 播放速率 2倍速 3倍速 4倍速 5倍速 playTime(n)
// playTime 设置一个播放时间，如果之前有记录播放时间，则从记录的时间开始播放 platTime(n)
// playProgress 快进n秒 playProgress(n) 或后退n秒 playProgress(-n)
const { play, playReset, playRate, playTime, playProgress } = useVideo(
  [
    {
      src:
        'https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4',
      type: 'video/mp4',
    },
    {
      src:
        'https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.webm',
      type: 'video/webm',
    },
  ],
  {
    container: '#main',
    width: 1000,
    height: 600,
    className: 'bg-red',
  },
)
```

## treeToArray
- 将树结构转换为数组
- 参数:
  - tree: {} // 树结构数据
  - children: 'children' // 子节点字段名
```js
const tree = {
  id: 1,
  label: '一级',
  parent_id: 0,
  children: [
    {
      id: 2,
      label: '二级',
      parent_id: 1
    },
    {
      id: 3,
      label: '二级',
      parent_id: 1
    }
  ]
}

const arr = treeToArray(tree)
console.log(arr)
// [
//   {"id":1,"parent_id":0,"label":"一级"},
//   {"id":2,"parent_id":1,"label":"二级"},
//   {"id":3,"parent_id":1,"label":"二级"}
// ]
```

## arrayToTree
- 将数组转换为树结构
- 参数:
  - array: 数组
  - rootId: 根节点id
  - options: {
    id: 'id', // id字段名
    pid: 'pid', // 父id字段名
    children: 'children' // 子节点字段名
  }
```js
const arr = [
  { id: 1, parent_id: 0, label: '一级' },
  { id: 2, parent_id: 1, label: '二级' },
  { id: 3, parent_id: 1, label: '二级' },
]
console.log(arrayToTree(arr, { pid: 'parent_id' }))
// [
//   {
//     id: 1,
//     parent_id: 0,
//     label: '一级',
//     children: [
//       {id: 2, parent_id: 1, label: '二级', children: []},
//       {id: 3, parent_id: 1, label: '二级', children: []}
//     ]
//   }
// ]
```

## useShare
- 通过调用本机的共享机制作为 Web Share API 的一部分。如果不支持 Web Share API，则此方法为 undefined。
- 参数:
  - url: 要共享的 URL  
  - text: 要共享的文本  
  - title: 要共享的标题
  - files: 要共享的文件
```js
useShare({
  url: 'https://www.baidu.com',
  text: '分享文本',
  title: '分享标题',
})
```

## writeFile
- 快速修改文件内容,支持多个文件同时修改
- 参数:
  - filePath: string | string[] 文件路径
  - callback: (content: string, index: number) => string 传入文件string类型的内容,可以修改后返回新的内容
```js
writeFile('./a.js', (content) => {
  return content.replace('a', 'b')
})
```

## insertUnocssInclude
- unocss作为props传入的组件打包会丢失注释// @unocss-include,这个函数会自动插入到打包后的文件头部
- 参数:
  - path: string | string[] 文件路径, 默认 ['./dist/index.js', './dist/index.mjs']
```js
insertUnocssInclude()
```

## useIntersectionObserver
- 监听元素重叠事件
- 参数:
  - element: Element | string 被观察元素
  - callback: Function 回调函数
  - options: {
    root?: Element | Document | null; // 可选，可以指定一个节点作为视口的根节点，默认为document.body
    rootMargin?: string; // 可选，可以指定一个节点作为视口的根节点，默认为document.body
    threshold?: number | number[]; // 可选，可以指定一个或多个触发重叠检测的阈值，默认为0
}
```js
useIntersectionObserver('.loading', (entries) => {
  // 相对body容器.loading的重叠事件
})
```

## sortByOrder
- 将数组按照另一个数组的顺序排序
- 参数:
  - arr: 数组
  - prop: 数组的对象中的属性名称
  - order: 排序的数组
```js
const order = ['name', '*', 'weight']
const arr = [{
  props: {
    key: 'weight'
  }
}, {
  props: {
    key: 'name'
  }
}, {
  props: {
    key: 'width'
  }
}, {
  props: {
    key: 'age'
  }
}]
const result = sortByOrder(arr, order, 'props.key')
/*
 [
        {
          "props": {
            "key": "name",
          },
        },
        {
          "props": {
            "key": "width",
          },
        },
        {
          "props": {
            "key": "age",
          },
        },
        {
          "props": {
            "key": "weight",
          },
        },
      ]
*/
```

## ExportPlugin
- VitePlugin
- 将以参数结尾的文件直接导出
```js
// glsl文件即可import glsl from 'xxx.glsl
export default defineConfig({
  plugins: [
    exportPlugin('glsl'),
  ],
})
```

## insertElement
- 插入dom元素
- 参数:
  - parent: string | HTMLElement 父元素
  - element: string | HTMLElement 插入元素
  - target: 插入位置 (默认插入到第一个节点)
```js
const div = createElement('div', {
  id: 'test',
  style: 'background: red;font-size:20px',
})
insertElement('#main', div) // 插入到第一个节点
insertElement('#main', '#test') // 插入到第一个节点
insertElement('#main', div, null) // 插入到最后
```

## removeElement
- 删除dom元素
- 参数:
  - element: dom元素
```js
removeElement(element) // 返回element的parentNode
```
## findElement
- 查找dom元素
- 参数:
  - selector: 查找的选择器
  - single: 是否只查找一个元素
```js
findElement('video') // <video>
findElement('video', true) // [<video>, <video>]
```

## useWebp
- 判断当前环境是否支持webp
```javascript
useWebp() // true or false
```

## calFps
- 计算FPS
```javascript
const stop = calFps()
stop() // 停止计算
```

## useResizeObserver
- 监听浏览器窗口变化
- 参数:
  - callback: 回调函数
```javascript
const stop = useResizeObserver((width,height)=>{
  console.log(width,height)
})
stop() // 停止监听
```

## useWindowScroll
- 监听浏览器滚动位置
- 参数:
  - callback: 回调函数
```javascript
const stop = useWindowScroll((left,top)=>{
  console.log(left,top)
})
stop() // 停止监听
```

## useElementBounding
- getBoundingClientRect响应式的封装
- 参数:
  - element: string | Element
  - callback: (rect: DOMRect) => void
```javascript
const stop = useElementBounding('#id',(rect)=>{
  console.log(rect)
})
stop() // 停止监听
```

## useMutationObserver
- MutationObserver封装
- 参数:
  - element: string | Element
  - callback: (mutationObserver: MutationObserver) => void
  - options:  {
    childList?: boolean
    attributes?: boolean
    characterData?: boolean
    subtree?: boolean
    attributeOldValue?: boolean
    characterDataOldValue?: boolean
    attributeFilter?: string[]
    }
```javascript
const stop = useMutationObserver('#main', (mutations)=>{
  console.log(mutations)
}, {attributes:true})
stop() // 停止监听
```

## sliderValidation
- 滑块验证功能
- 参数:
  - url: 背景图片地址
  - container: 滑块容器
  - width: 滑块大小 默认42px
  - callback: 滑块验证成功回调函数
```javascript
sliderValidation('/assets/image.jpg', document.body)
```

## picInPic
- 给video开启画中画模式
- 参数:
  - video: string | HTMLVideoElement
```javascript
const toggle = picInPic('#video')
toggle() // 开启关闭画中画模式
```

## shareScreen
- 浏览器屏幕分享
- 部分浏览器可能存在兼容问题
- 浏览器需要授权
- 参数:
  - container: 屏幕分享的展示容器
  - callback: 停止分享时的回调
```javascript
shareScreen('#main',() => {
  console.log("已停止分享");
});
```

## dbStorage
- 浏览器大数据存储
- 存储容量 >250MB
- 同源策略
- 异步操作
- 持久化存储
- 支持二进制储存
```javascript
  const { add, read, remove } = await dbStorage()
  set('key', { video:Blob }) // 添加数据或更新数据 key: string | number, value: object
  read('key') // 读取数据 key: string | number, 返回 { video:Blob }
  remove('key') // 删除数据 key: string | number
```

## waterfall
- 瀑布流布局
- 宽度固定
- 支持追加新的图片
- 参数:
  - urlList 图片地址列表
  - container 父容器 默认为body
  - width 图片宽度 默认为200
```javascript
const append = waterfall([
  "../public/kt.png",
  "../public/favicon.svg",
  "../public/wechat.jpg",
  "../public/favicon.svg",
  "../public/favicon.svg",
  "../public/zfb.jpg",
  "../public/favicon.svg",
  "../public/favicon.svg",
]);

useWindowScroll(() => {
  if (isBottom()) { // 触底追加新图片
    append([
      "../public/kt.png",
      "../public/favicon.svg",
      "../public/wechat.jpg",
      "../public/favicon.svg",
      "../public/favicon.svg",
      "../public/zfb.jpg",
      "../public/favicon.svg",
      "../public/favicon.svg",
    ]);
  }
});
```

## dragEvent
- 点击拖拽松开事件封装
- 移动端touch会有更好的体验，但是与mouse的event有所区别
- dragEvent会在移动端是切换touch事件,在PC端是用mouse事件，保持接收的event对象基本是一致的
- 参数:
  - target: string | HTMLElement 目标元素
  - options: { dragStart: (e) => void 按下, dragMove: (e) => void 拖拽, dragEnd: (e) => void 松开 }
  - trigger: boolean 默认false,在容器上移动就会触发，为true时，只有按下在目标元素上移动才会触发
```javascript
dragEvent('#main', {
  dragStart(e) {
    console.log('start', e.clientX, e.clientY)
  },
  dragMove(e) {
    console.log('move',  e.clientX, e.clientY)
  },
  dragEnd(e) {
    console.log('end',  e.clientX, e.clientY)
  },
})
```

## compressImage
- 图片压缩函数
- Promise
- 参数:
 - source: 图片路径 | 图片base64 | 图片blob
  - options: { quality: number 压缩质量  maxWidth: number 图片宽度  maxHeight: number 图片的高度  type: 'Blob' | 'base64' | 'blob' 图片返回的类型 }
```javascript
  const file = fileEl.value.files[0];
  const result = await compressImage(file, {
    quality: 0.5,
    maxWidth: 100,
    maxHeight: 100,
    type: "blob",
  }); // Blob {size: 3095, type: 'image/jpeg'}
```

## addEventListener
- 给元素添加事件函数
- 返回一个remove函数
- 参数:
  - target: Element | string, 目标元素
  - eventName: string, 事件名称
  - callback: (e)=>void, 回调函数
  - capture: boolean, 是否捕获
  - autoRemove: boolean, 是否自动移除事件
```javascript
const remove = addEventListener('#btn',
  'click',
  () => {
    console.log('click')
  }
)
addEventListener(document,'DOMContentLoaded', () => {
  console.log('我就执行一次,然后事件就被自动移除了')
}, false, true)
```
## createElement
- 创建dom函数
- 参数:
  - tagName: string, 元素标签名称
  - attrs: object, 元素属性对象
```javascript
const div = createElement('div', {
  class: 'className',
  style: 'color: red;',
  style: 'color: red;font-size: 20px;'',
})
```
## sleep
- 睡眠函数
- 参数:
  - time: 睡眠时间(单位:毫秒)
  - callback: 睡眠结束后的回调函数
```javascript
  sleep(1000, () => {
    console.log('睡眠结束')
  })
  // await sleep(1000)
```

## htmlTransform
- 将template字符串通过ast操作后转回字符串
- 只支持对于html的简单操作,不支持对于js的操作
- 可用于小程序不同渠道的转换、一些特殊占位符的替换、模板的替换插入删除操作等等

```javascript
  const code = await htmlTransform('<div class="_ee">hello</div><view bindtap="xx"></view>', {
    div(node, { setAttribs,beforeInsert, afterInsert }) {
      node.name = 'p'
      setAttribs('age','19')
      beforeInsert('<span>hi</span>')
      afterInsert('<span>你好</span>')
    },
    '*'(node){
      // 所有的节点都会进入这里
    },
    "$attr$_ee"(node){
      // $attr$开头会匹配存在_ee属性的节点
    },
    "$attr$bindtap"(node,{ renameAttribs }){
      renameAttribs('bindtap','onTap')
    }
  })
  console.log(code) // <span>hi</span><p age="19" class="_ee">hello</p><span>你好</span><view onTap="xx"></view>
```

## idleCallbackWrapper
- 包裹了requestIdleCallback和cancelIdleCallback的一个封装函数
- 兼容了浏览器的不同版本
- 简化了调用方式
- 返回stop方法可以停止执行
- 默认在tasks为[],auto stop
- 默认timeout为2000
- 参数:
  - tasks: 待执行的任务数组
  - timeout: 超时时间(单位:毫秒)
  - callback: 执行完成后的回调函数
```javascript
// idleCallbackWrapper(tasks,()=>{console.log('end')}) // 默认第二个参数为2000的简写
const tasks: Function[] = [
  () => {
    for (let i = 0; i < 3000; i++) {
      console.log(i);
    }
    console.log("first task");
  },
  () => {
    for (let i = 0; i < 30000; i++) {
      console.log(i);
    }
    console.log("second task");
  },
  () => {
    for (let i = 0; i < 30000; i++) {
      console.log(i);
    }
    console.log("third task");
  },
];
// 封装前的场景
requestIdleCallback(fn, { timeout: 1000 });
function fn(deadline: Deadline) {
  console.log("deadline", deadline);
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
    tasks.shift()();
  }
  if (tasks.length > 0) {
    requestIdleCallback(fn1);
  }
}

// 封装后的场景 更加简短方便
const stop = idleCallbackWrapper(tasks, 1000)
```

## animationFrameWrapper
- 包裹了requestAnimationFrame和cancelAnimationFrame的封装函数
- 兼容了浏览器的不同版本
- 简化了调用方式
- 返回stop方法可以停止动画
- 参数:
  - fn: 待执行的函数
  - timeout: 超时时间(单位:毫秒) = 1000
  - autoStop: 执行一次后停止动画
```javascript
const count = ref(0)
// 封装前的场景
const animationId = requestAnimationFrame(fn)

function fn(timestamp) {
  if (start === null) {
    start = timestamp
  }
  else {
    const delta = timestamp - start
    if (delta > 1000) {
      count.value++
      if (count.value > 10) {
        cancelAnimationFrame(animationId)
      }
    }
  }
  requestAnimationFrame(fn)
}
// 封装后的场景 更加简短方便
const stop = animationFrameWrapper(() => {
  count.value++
  if (count.value > 10) {
    stop()
  }
}，1000)
```

## DotImageCanvas
- 将图片的像素转为点阵图片
- 参数:
  - src: 图片路径
  - color: 点阵的颜色 为空则取原像素颜色
  - fontWeight: 点阵的粗细
  - bgColor?: 图片背景色 默认为白色
- 可以await repaint中的dotImage.repaint(xxx)中的dotImage.status判断正确的src被加载完成的时机
```javascript
const dotImage = new DotImageCanvas('./img/1.jpg','red', 1, '#000')
dotImage.append('#main')
// 如果有更新,可以调用dotImage.repaint('xxx','xxx',x)更新，url一致回会服用上次的图片，只更新颜色和粗细
setTimeout(() => {
  dotImage.repaint('./img/1.jpg','yellow' 1, '#000')
}, 1000)
```

## fileSplice
- 大文件切片处理函数
- 参数:
  - file: File文件对象
  - size: 切片大小(单位:字节) = 100kb // 切片的数量超过100就设定最大切片数量为100,大小为 File.size / 100
- 返回切片数组
```javascript
// fileSplice(file: File, chunkSize: number = 1024 * 100) 
const chunks = fileSplice(file, 1024 * 1024) // [ { file: Blob, filename: string } ]
```

## pwdLevel
- 判断数字的强度
- 参数:
  - num: 待判断的数字
  - min: 数字最少长度
- 返回: 强度等级 0-4
```javascript
const levels = ['', '低', '中', '高', '极高']
console.log(levels[pwdLevel('123456')]) // 低
console.log(levels[pwdLevel('123456', 7)]) // ''
console.log(levels[pwdLevel('q123456')]) // 高
```

## sort
- 数组排序
- 参数:
  - arr: 待排序的数组
  - regular: 排序规则,常规number[],1升序,-1降序,默认升序; 复杂类型需要自定义排序规则['name'],安装数组对象name属性升序等等...
- 支持升序降序和多条件排序
```javascript
const numbers =  [1, 5, 7, 3, 2, 4, 6, 8, 9, 10]
console.log(sort(numbers,1)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(sort(numbers,-1)) // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const array = [{name: 'simon', age: 18}, {name: 'kitty', age: 20}]
console.log(sort(array, 'name')) // [{name: 'kitty', age: 20}, {name: 'simon', age: 18}]
console.log(sort(array, '-name')) // [{name: 'simon', age: 18}, {name: 'kitty', age: 20}]
const array2 = [{name: 'simon', age: 18}, {name: 'kitty', age: 20},{name: 'simon', age: 19}]
console.log(sort(array2, ['age','name'])) // [{name: 'kitty', age: 20}, {name: 'simon', age: 18}, {name: 'simon', age: 19}]
console.log(sort(array2, ['-age','name'])) // [{name: 'simon', age: 19}, {name: 'simon', age: 18}, {name: 'kitty', age: 20}]
```

## CreateSignatureCanvas
- 生成一个签名的canvas模板
- 参数:
  - width: canvas宽度
  - height: canvas高度
```javascript
const signature = new CreateSignatureCanvas(400, 400)
document.body.appendChild(signature.canvas)
const base64 = signature.save()
signature.clear() // 清除签名
```

## DotTextCanvas
- 根据文字返回一个点阵的canvas
- 参数：
  - text: 文字
  - fontSize: 字体大小
  - color: 字体颜色
  - fontWeight: 点阵粗细
```javascript
// 可从dotText.status判断是否加载完成,如果加载完成,可以调用dotText.repaint(xxx)更新文字
const dotText = DotTextCanvas('hello', 20, '#000', 1)
dotText.append('#main') // 将canvas插入到指定元素中
```

## getLru
- 记录有限的数据,删除最久未访问的数据
- 参数:
  - max: 最大缓存数量
```javascript
const lru = getLru(2)
lru.set('a', 1)
lru.set('b', 2)
console.log(lru.get('a')) // 1
lru.set('b', 3)
console.log(lru.size()) // 2
console.log(lru.get('a')) // 1
console.log(lru.get('b')) // undefined
```

## escapeHtml
- 将html字符串转换为实体字符串
- 参数:
  - html: html字符串
```javascript
console.log(excapeHtml("< a href=" ">xx</ a>")) // "&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;"
```

## unescapeHtml
- 将实体字符串转换为html字符串
- 参数:
  - html: 实体字符串
```javascript
console.log(unescapeHtml('&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;')) // "< a href=" ">xx</ a>"
```

## timeCost
- 计算函数执行时间
- 参数:
  - fn: 函数
```javascript
timeCost(()=>{
  let a = 1
  for(let i=0;i<1000;i++){
    a++
  }
}) // 输出: timeCost: 0.046s
```

## log
- 简化console.log的使用
- 参数:
  - msg: 打印的信息
  - color: 打印的颜色
  - fontSize: 打印的字体大小
```javascript
log('hello world') // hello world
```

## copy
- js控制复制的内容
- 参数:
  - str: 待复制的内容
```javascript
btn.onclick = () =>  {
  if(copy(textarea.value)){
    alert('复制成功')
  }
}
```

## getDateList
- 获取指定日期范围内正负多少天的日期列表
- 参数:
  - startDate: 开始日期
  - days: 正负多少天
```javascript
console.log(getDateList('1991/3/02', 7)) // [ '1991-3-02', '1991-3-03', '1991-3-04', '1991-3-05', '1991-3-06', '1991-3-07', '1991-3-08' ]
```

## isType
- `isType(o:any, type:string)`: 判断obj是否是type类型
- 参数:
  - o: 待判断的对象
  - type: 待判断的类型 // 如果是多种类型,用'|'分隔 如: 缩写 - 'O|S'  全写 - 'Object|String'
```javascript
console.log(isType(1, 'Number')) // true
console.log(isType('1', 'N')) // false
console.log(isType({}, 'O | A')) // true (Object | Array)
console.log(isType(new Promise(), 'P')) // true (Promise)
console.log(isType(function(){}, 'P | F')) // true (Promise | Function)
```

## randomDate
- 随机生成日期
- 参数:
  - startDate: 开始日期 1999/01/01 支持/或-
  - endDate: 结束日期
```javascript
// end默认是当前日期
console.log(randomDate('1999/01/01')) // Mon Jun 06 2011 15:11:37 GMT+0800 (中国标准时间) 可再通过formateDate转换为其他格式 如'yyyy-MM-dd'
```

## uniqueArray
- 去除数组中重复的元素
- 支持去除数组中的对象的重复元素
```javascript
// 完全比对值来判断是否重复
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
- 深度比较两个对象是否相等
- ignoreKeys忽略指定的keys可以为数组或者正则表达式
- 参数:
  - a: 待比较的对象
  - b: 待比较的对象
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
- 参数:
  - a: 待返回的对象
  - ...args: 待合并的对象
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
- 参数:
  - max: 最大并发数量
  - fn: Promise[]
```js
// limit 并发数量 , tasks httpRequest[]
asyncPool(limit, tasks).then((results) => {
  // results is an array of results
})
```

## quickFind 
- quickFind(array: any[], key: any) ,返回一个新的实例
- 参数:
  - array: 待查找的数组
  - key: 待查找的key,根据key来查找
- 在实例中find方法可以根据key查找对应的项-O(1)
- set更新或新增项-O(1)
- delete删除项-O(1)
```javascript
const find = quickFind([{id:1,name:'simon'},{id:2,name:'simon'}],'id')
find.find(1) // find: id = 1 => {id:1,name:'simon'}
find.set({id:1,name:'simon'})
find.delete(1) // delete: id = 1 => {id:1,name:'simon'}
```
## quickFilter 
- 快速模糊查找key名字的项和值 如: 'name=/h/'
- 参数:
  - array: 待过滤的数组
  - key: 待过滤的key,根据key来过滤,支持正则匹配key名字的项和值的项
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
- 深拷贝对象
- 支持循环依赖
- 支持复杂类型
- 轻量级的深拷贝
- 参数:
  - obj: 待拷贝的对象
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
const obj2 = deepClone(obj) // 返回一个新对象
```
## curry 
- 函数柯里化
- 参数:
  - fn: 待柯里化的函数
```javascript
const add = (a, b) => a + b
const add1 = curry(add)
const add2 = add1(1)
const add3 = add2(2)
add3(3) // 6
```

## memorizeFn 
- 根据参数返回一个能缓存结果的函数
- 参数：
  - fn: 待缓存的函数
```javascript
let count = 0
const fn = memorizeFn(()=> count++)
fn()
fn()
console.log(count) // => 1
```

## debounce 
-  函数防抖
-  参数：
  - fn: 待防抖的函数
  - delay: 延迟时间
```javascript
const f = debounce(() => {
  console.log('debounce')
}, 1000)
```
## throttle 
- 函数节流
- 参数：
  - fn: 待节流的函数
  - delay: 延迟时间
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
- 参数:
  - target: 待遍历的对象或数组
  - options: 多个函数,以函数名来获取对象或数组中的key的item值
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
  'family.name'(target: any, index: number, item: any) { // 遍历obj.family.name
    console.log(target, index)
  }
})
```

## transformKey 
- 支持多层级的key
- 将对象的key转换成需要的key
- 参数:
  - obj: 待转换的对象
  - options: 通过键值对象来设置转换的key,可通过.来设置多层级的key
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
const newObj = transformKey(obj, { // 将obj的key转换成新的key
  'family.name': 'familyName',
  'family.age': 'familyAge'
})
console.log(newObj)
// { familyName: 'simon', familyAge: 18, name: 'simon' }
```


## once
- 只执行一次的函数
- 参数:
  - fn: 待执行一次的函数
```javascript
document.addEventListener('click', once(() => {
  console.log('click')
}))
document.click() // click
document.click() // 
```

## VFetch
- 基于fetch的axios api 式promise请求封装
- 重复请求上一个请求如果没有完成，则会取消上一个请求，并重新发起请求
```typescript
interface IFetchInterceptors {
  request?: {
    success?: (config: IFetchConfig) => IFetchConfig
    error?: (error: any) => Promise<never>
  }
  response?: {
    success?: (response: any) => any
    error?: (error: any) => Promise<never>
  }
  success?: (response: Response) => Response
  error?: (error: any) => Promise<never>
}

interface IFetchConfig extends IFetchOptions {
  url: string // 请求地址
  keepalive?: boolean // 属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据
  body?: any  // body参数 {},GET请求会合并到url后面
  integrity?: string  // 属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。
  referrer?: string  // 属性用于设定fetch()请求的referer标头。
  referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'same-origin'
  method?: Method // 请求类型 默认GET 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' 支持vFetch.get | post | delete | put的形式
  credentials?: Credentials // 请求是否带上cookie 默认omit 'include' | 'same-origin' | 'omit'
  params?: Record<string, string>  // 请求参数 根据bodyType决定是否会被序列化
  responseType?: ResponseType // 返回类型 默认json 'formData' | 'text' | 'blob' | 'arrayBuffer' | 'json'
  bodyType?: BodyType // 请求类型 默认json 'json' | 'form' | 'file'
  cache?: Cache // 缓存类型 默认不缓存 'no-cache' | 'default' | 'force-cache' | 'only-if-cached'
  redirect?: Redirect // 属性指定 HTTP 跳转的处理方法。可能的取值如下： 默认follow follow：跟随重定向，error：抛出错误，manual：手动处理
  mode?: Mode // cors, no-cors, same-origin 默认cors cors：跨域，no-cors：不跨域，same-origin：同源
  signal?: AbortSignal // 取消请求的信号
  cancel?: () => void // 取消请求的方法
  transformResponse?: (response: Response) => Response // 响应数据转换
}

interface IFetchOptions {
  baseURL?: string  // 基础url
  timeout?: number // 超时时间 ms 默认为20000
  headers?: Record<string, any>  // 请求头 例如: {'Content-Type': 'application/json'}
  interceptors?: IFetchInterceptors // 请求拦截器
}
  // useage
const request = new VFetch({
  baseURL: 'http://localhost:3001/',
  interceptors: {
    response: {
      success(data) {
        console.log('拦截', data)
        return `${data}nihao`
      },
    },
    request: {
      success(data) {
        // data.headers.token = 'test'
        return data
      },
    },
  },
})
request.get({
  url: 'nihao',
  responseType: 'text',
}).then((res: any) => {
  console.log(res)
})

request.get({ // 取消上一个请求
  url: 'nihao',
  responseType: 'text',
}).then((res: any) => {
  console.log(res)
})
```

## stringify
- 将对象序列化为字符串
- 参数：
  - obj: 要转换的对象
  - 选项: 转换选项{
    sep?: 字符串;分隔符默认“&”
    eq?: 字符串;等号默认“=”
    hyp?: 布尔值;是否将驼峰设置为连字符默认 false
    px?: 布尔值;是否启用数字到 px 默认 false
  }
```javascript
console.log(stringify({ user: 'simon', age: '18' })) // 'user=simon&age=18'
console.log(stringify({ width: 100, height: '18px',backgroundColor:'red' },{ sep:';', eq:':', hyp:true, px: true})) // 'width:100px;height:18px;background-color:red'
```

## parse
- 将字符串转换为对象
- 参数:
  - str: 待转换的字符串
  - opts: 转换选项 {
    sep?: string;  字符串;分隔符默认“&”
    eq?: string;  字符串;等号默认“=”
    camel?: boolean; 布尔值;是否将连字符设置为驼峰默认 false
  }
```javascript
console.log(parse('user=simon&age=18')) // { user: 'simon', age: '18' }
console.log(parse('width:100px;height:18px;background-color:red', {
  sep: ";",
  eq: ":",
  camel: true,
})) // {width: '100px', height: '18px', backgroundColor: 'red'}
```
## jsCookie
```javascript
jsCookie.set('name', 'simon') 
console.log(jsCookie.get('name')) // 'simon' 
jsCookie.remove('name')  
console.log(jsCookie.get('name')) // ''
```
## uuid
- 生成uuid 
- 参数:
  - len: 长度 默认为8
  - radix: 进制 默认为16
- 支持限制生成的uuid长度和类型 
```javascript
console.log(uuid()) // '71A793A9-BBAE-49FC-B957-5BC71E5AD044'
console.log(uuid(16, 'hex')) // 'a0b1c2d3e4f5' 
console.log(uuid(8, 2)) // '11110011'
```
## formateDate
- 格式化日期
- 参数:
  - date: 日期
  - fmt: 格式 默认为'yyyy-MM-dd'
```javascript
console.log(formateDate(new Date(), 'yyyy-MM-dd')) // '2019-01-01'
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
- params: 
  - enableHighAccuracy: boolean 高精度 
  - timeout: number 超时时间 
  - maximumAge: number 缓存时间
```javascript
console.log(await getLocation()) //  { enableHighAccuracy: boolean = false, timeout: number = 5000, maximumAge: number = 0 }
```
## getDevice
- 获取系统信息
- os:系统 dev:浏览器
```javascript
console.log(getDevice()) // { os: 'android', dev: 'chrome' }
```
## preload
- 预加载图片
- 参数:
  - src: 图片路径或图片路径集合
```javascript
preload('https://img.yzcdn.cn/vant/cat.jpeg')
preload(['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/dog.jpeg'])
<img src="https://img.yzcdn.cn/vant/cat.jpeg" /> // memory cache
```

## lazyLoad
- 图片懒加载
- 参数:
  - element: 图片元素,如果是属性会自动获取element
  - params-1: 图片的集合 Element | Element[] | NodeList[] | class | id | tagName 
  - params-2: root 指定相对容器默认是body 
  - params-3: rootMargin 指定相对容器的边距 默认距离容器底部200px时候加载(↑ → ↓ ←) '0px 0px 200px 0px' 
  - params-4: threshold 指定图片加载的阈值
```javascript
// usage
// 默认展示src的图片，当滚动到图片的时候data-src替换src
  lazyLoad(document.querySelectorAll("img"));
  lazyLoad("img[data-src]");
  lazyLoad(".img-wrapper>img");
// template
  <img src="temp" data-src="../public/favicon.svg" alt="" h-10 bg-red />
```

## addScript
- 动态添加script标签放 => head
- 参数:
  - src: script路径
```javascript
addScript('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js')
```

## addLink
- 动态添加link标签放 => head
- 参数:
  - src: link路径
```javascript
addLink('https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css')
```

## addStyle
- 动态添加style标签 => head
- 参数:
  - str: style内容
```javascript
/* 
<style>
 .test {
  color: red;
 }
</style>
将会杯插入head标签中
*/
addStyle(`
  .test {
    color: red;
  }
`)
```
## download
- 下载文件
- 参数:
  - url: 文件路径
  - filename: 文件名
```javascript
// 下载名为baidu.png地址为https://www.baidu.com/img/bd_logo1.png图片
download('https://www.baidu.com/img/bd_logo1.png', 'baidu.png')
```

## trim
- 字符串去除空格
- 参数:
  - str: 字符串
  - type: 去除空格类型,默认去除前后空格
```javascript
trim(str: string,type: 'pre' | 'post' | 'around' | 'all' = 'around') 
console.log(trim('  h e l l o  ')) // 'h e l l o'
console.log(trim('  h e l l o  ', 'pre')) // 'h e l l o  '
console.log(trim('  h e l l o  ', 'post')) // '  h e l l o'
console.log(trim('  h e l l o  ', 'all')) // 'hello'
```

## compressCss
- 压缩css
- 参数: 
  - str: css内容
```typescript
compressCss(css: string): string
```

## scrollToTop
- 回到顶部
```javascript
// 缓慢回到顶部
scrollToTop()
```

## createEventBus
- createEventBus() 
- emit 事件发送
- on 事件监听
- off 事件取消
- 创建发布订阅模式的实例
```javascript
const eventBus = createEventBus()
eventBus.emit('test', 'hello')
const listener = (data: string) => {
  console.log(data)
}
eventBus.on('test', listener)
eventBus.off('test',listener)
```

## randomHexColor
- 随机生成十六进制颜色
```javascript
console.log(randomHexColor()) // '#ff0000'
```

## randomRgb
- 随机生成RGB颜色
```javascript
console.log(randomRgb())// 'rgb(255,0,0)'
```

## httpsRedirect
- https重定向
```javascript
// http://www.baidu.com => https://www.baidu.com
httpsRedirect()
```

## scrollToView
- 滚动到指定元素
- 参数:
  - element: 可视目标元素
```javascript
scrollToView(el: HTMLElement | string)
```

## getScrollPosition
- 获取滚动位置
```javascript
console.log(getScrollPosition()) // { x: number, y: number }
```

## camelize
- 驼峰化
- 参数:
  - str: 字符串
```javascript
console.log(camelize(hello-world)) // 'helloWorld'
```

## hyphenate
- 连字符化
- 参数:
  - str: 字符串
```javascript
console.log(hyphenate(helloWorld)) // 'hello-world'
```

## getUrlParam
- 获取url参数
- 参数:
  - url: string // url地址, 默认获取当前页面url参数
```javascript
console.log(getUrlParam('?name=simon&age=18'))// { name: 'simon', age: '18' }
```

## fullScreen
- fullScreen()
- 全屏
```javascript
fullScreen()
```

## exitFullScreen
- exitFullScreen()
- 退出全屏
```javascript
exitFullScreen()
```

## toBase64
- 将blob | file | url转换为base64
- 参数:
  - blob: blob对象 | file: file对象 | url: string // 图片地址
```typescript
toBase64(file: File, type: 'file' | 'blob' | 'url' = 'url'): string
```

## base64ToFile
- 将base64转换为file
- 参数:
  - base64: string // base64字符串
  - name: string // 文件名
```typescript
base64ToFile(s: string, name: string): File
```

## base64ToBlob
- 将base64转换为blob
- 参数:
  - base64: string // base64字符串
```typescript
base64ToBlob(s: string): Blob
```

## uppercaseNum
- 将数字转换为大写字母
- 参数:
  - num: number // 数字
```javascript
// uppercaseNum(num: number | string) => string
console.log(uppercaseNum(1)) // '一'
```

## formateNum
- 将数字格式化
- 参数:
  - num: number // 数字
  - decimals: number // 小数位数, 默认为2
  - integer: 'floor' | 'ceil' 小数截取方式 floor:向下取整 ceil:向上取整
```javascript
// formateNum(number: number | string, decimals = 2, integer: 'floor' | 'ceil' = 'ceil') => string
console.log(formateNum(12253.123, 2)) // '12,253.12'
```

## interceptError
- 异常拦截
- 参数：可能存在异常的函数，返回一个promise类型的错误处理函数
- 可以避免不断的try...catch
- 参数:
  - fn: 可能存在异常的函数
```javascript
// interceptError(fn: Function) => Promise<any>
interceptError(() => { throw new Error('error') }).catch(err=>{ console.log(err) })
```
## isBottom
- 判断滚动是否触底
- distance: 距离底部的距离作为触底的判断标准 默认0
```javascript
// isBottom(distance: string = 0): boolean
console.log(isBottom()) // false
```

## calNum
- 计算数字
- type: '加' | '减' | '乘' | '除'
- 参数:
  - num1: number // 数字1
  - ...args: number[] // 数字n
```javascript
console.log(calNum.add(0.1, 0.2, 0.2)) // 0.5
console.log(calNum.div(0.1, 0.2, 0.2)) // 2.5
console.log(calNum.sub(0.1, 0.2, 0.2)) // -0.3
console.log(calNum.mul(0.1, 0.2, 0.2)) // 0.004
```

## ruleJudgment
- isMobile  - 判断是否是手机号
- isEmail - 判断是否是邮箱
- isIdCard  - 判断是否是身份证
- hasCn - 判断是否含有中文
- isFile - 判断是否是File类型
- isBlob - 判断是否是Blob类型
- isUrl - 判断是否是Url类型
- isAbsolute - 判断是否是绝对路径
- isElement - 判断是否是HTMLElement

## GitHub地址
[欢迎PR](https://github.com/Simon-He95/simon-js-tool)

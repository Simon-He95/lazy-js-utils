<p align="center">
<img height="200" src="./assets/kv.png" alt="simon-js-tool">
</p>
<p align="center"><a href="https://www.npmjs.com/package/simon-js-tool"><img src="https://img.shields.io/npm/v/simon-js-tool?color=3fb883&amp;label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/simon-js-tool"><img src="https://img.shields.io/npm/dm/simon-js-tool?style=social" alt="NPM version"></a>
<a href="https://github.com/Simon-He95/simon-js-tool"><img src="https://img.shields.io/github/stars/Simon-He95/simon-js-tool?style=social" alt="NPM version"></a>
</p>
<p align="center"><a href="http://vitepress.hejian.club/">文档</a></p>
<p align="center"> <a href="./README_en.md">English</a> | 简体中文</p>

目前整理了<strong>100+</strong>的常用函数,还在持续更新中...,你的认可是对我最大的鼓励 :hearts:


## :100: 亮点
- 纯js的工具函数,可使用在任何可执行js的环境
- 大量减少`ref<HTMLElment>` 和 `onMounted`的使用，可以script标签直接调用
- 所有的副作用函数都能返回一个stop函数，可以在任意地方停止事件的执行，并且在页面销毁时自动销毁事件
- api设计简单、实用、类型友好

## &#x270B; 例子
```js
import { addEventListener, animationFrameWrapper, insertElement, useMutationObserver } from 'simon-js-tool'
// 监听container的变化, 你不在需要const container = ref<HTMLElement>
useMutationObserver('#container', (mutationsList, observer) => {
  console.log(mutationsList)
})
// requestAnimationFrame
animationFrameWrapper((timestamp) => {
  // 每针相隔1s执行
  console.log('animationFrame', timestamp)
}, 1000, true /* 只执行一次后被销毁 */)
// 注册事件
addEventListener('#container', 'click', () => {
  console.log('click')
})
// 插入元素
insertElement('#container', '.content')
// 删除元素
removeElement('.content')
```
```html
<div id="container"></div>
<div class="content">hello world</div>
```

## :balloon: 更多
- 导出函数 [exports-function](https://github.com/SimonHe1995/exportsFunction)
- threejs [@simon_he/s-three]Charts [@simon_he/s-chart](https://github.com/SimonHe1995/sCharts)
- numsWheel [@simon_he/nums-wheel](https://github.com/SimonHe1995/numsWheel)
- vAxios [@simon_he/v-axios](https://github.com/SimonHe1995/vAxios)



## :book: 使用说明
```bash
npm i simon-js-tool # 安装

import { 
  deepCompare
 } from 'simon-js-tool' # 按需引入

```

## 👉 [文档](http://vitepress.hejian.club/)


## :coffee: 
[请我喝一杯咖啡](https://github.com/Simon-He95/sponsor)

## GitHub地址
[欢迎PR](https://github.com/Simon-He95/simon-js-tool)

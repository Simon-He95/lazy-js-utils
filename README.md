<p align="center">
<img height="200" src="./assets/kv.png" alt="lazy-js-utils">
</p>
<p align="center"><a href="https://www.npmjs.com/package/lazy-js-utils"><img src="https://img.shields.io/npm/v/lazy-js-utils?color=3fb883&amp;label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/lazy-js-utils"><img src="https://img.shields.io/npm/dm/lazy-js-utils?style=social" alt="NPM version"></a>
<a href="https://github.com/Simon-He95/lazy-js-utils"><img src="https://img.shields.io/github/stars/Simon-He95/lazy-js-utils?style=social" alt="NPM version"></a>
</p>
<p align="center"><a href="https://lazy-js-utils-docs.netlify.app/">🖥 文档</a></p>
<p align="center"> <a href="./README_en.md">English</a> | 简体中文</p>

目前整理了<strong>200 左右</strong>的常用函数,还在持续更新中...,你的认可是对我最大的鼓励 :hearts:

## :100: 亮点

- 纯 js 的工具函数,可使用在任何可执行 js 的环境
- 大量减少`ref<HTMLElment>` 和 `onMounted`的使用，可以 script 标签直接调用
- 所有的副作用函数都能返回一个 stop 函数，可以在任意地方停止事件的执行，并且在页面销毁时自动销毁事件
- api 设计简单、实用、类型友好

## &#x270B; 例子

```ts
import {
  insertElement,
  useAnimationFrame,
  useEventListener,
  useMutationObserver,
} from 'lazy-js-utils'
// 监听container的变化, 你不在需要const container = ref<HTMLElement>
useMutationObserver('#container', (mutationsList, observer) => {
  console.log(mutationsList)
})
// requestAnimationFrame
useAnimationFrame(
  (timestamp) => {
    // 每针相隔1s执行
    console.log('animationFrame', timestamp)
  },
  1000,
  true /* 只执行一次后被销毁 */,
)
// 注册事件
useEventListener('#container', 'click', () => {
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

## :book: 使用说明

```bash
npm i lazy-js-utils // 安装

import {
  deepCompare
 } from 'lazy-js-utils' // 按需引入

```

## 👉 [文档](http://vitepress.hejian.club/)

## :coffee:

[请我喝一杯咖啡](https://github.com/Simon-He95/sponsor)

## License

[MIT](./license)

## GitHub 地址

[欢迎 PR](https://github.com/Simon-He95/lazy-js-utils)

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/Simon-He95/lazy-js-utils@master/.github-contributors/Simon-He95_lazy-js-utils.svg">
    <img src="https://cdn.jsdelivr.net/gh/Simon-He95/lazy-js-utils@master/.github-contributors/Simon-He95_lazy-js-utils.svg" />
  </a>
</p>

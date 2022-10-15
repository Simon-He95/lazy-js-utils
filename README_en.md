<p align="center">
<img height="200" src="./assets/kv.png" alt="simon-js-tool">
</p>
<p align="center"><a href="https://www.npmjs.com/package/simon-js-tool"><img src="https://img.shields.io/npm/v/simon-js-tool?color=3fb883&amp;label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/simon-js-tool"><img src="https://img.shields.io/npm/dm/simon-js-tool?style=social" alt="NPM version"></a>
<a href="https://github.com/Simon-He95/simon-js-tool"><img src="https://img.shields.io/github/stars/Simon-He95/simon-js-tool?style=social" alt="NPM version"></a>
</p>
<p align="center"><a href="http://vitepress.hejian.club/">Docs</a></p>
<p align="center"> English | <a href="./README.md">简体中文</a></p>

At present, I have sorted out <strong>100+</strong> commonly used functions, and I am still updating..., and your recognition is the biggest encouragement to me :hearts:

## :100: Highlights
- Pure JS utility functions, Can be used in any environment where JS can be executed
- Greatly reduced the use of `ref<HTMLElment>` and `onMounted`, which can be called directly from the script tag
- All side effect functions can return a stop function, which can stop the execution of the event anywhere, and automatically destroy the event when the page is destroyed
- API design is simple, practical and type-friendly

## &#x270B; Example
```js
import { addEventListener, animationFrameWrapper, insertElement, useMutationObserver } from 'simon-js-tool'
// To listen for container changes, you don't need const container <HTMLElement>= ref
useMutationObserver('#container', (mutationsList, observer) => {
  console.log(mutationsList)
})
// requestAnimationFrame
animationFrameWrapper((timestamp) => {
  // Each needle is executed 1s apart
  console.log('animationFrame', timestamp)
}, 1000, true /* It is destroyed after only one execution */)
// Register for events
addEventListener('#container', 'click', () => {
  console.log('click')
})
// Insert an element
insertElement('#container', '.content')
// Delete an element
removeElement('.content')
```
```html
<div id="container"></div>
<div class="content">hello world</div>
```

## :balloon: More
- Export function [exports-function](https://github.com/SimonHe1995/exportsFunction)
- threejs [@simon_he/s-three](https://github.com/SimonHe1995/sThree)
- Echarts [@simon_he/s-chart](https://github.com/SimonHe1995/sCharts)
- numsWheel [@simon_he/nums-wheel](https://github.com/SimonHe1995/numsWheel)
- vAxios [@simon_he/v-axios](https://github.com/SimonHe1995/vAxios)


## :book: Instructions for use
```bash
npm i simon-js-tool # Installation

import { 
  deepCompare
 } from 'simon-js-tool' # Ingestion on demand

```

## 👉 [Documentation](http://vitepress.hejian.club/)

## :coffee:
[Sponsor me](https://github.com/Simon-He95/sponsor)

## GitHub地址
[Welcome to PR](https://github.com/Simon-He95/simon-js-tool)

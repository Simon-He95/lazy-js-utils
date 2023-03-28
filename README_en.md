<p align="center">
<img height="200" src="./assets/kv.png" alt="lazy-js-utils">
</p>
<p align="center"><a href="https://www.npmjs.com/package/lazy-js-utils"><img src="https://img.shields.io/npm/v/lazy-js-utils?color=3fb883&amp;label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/lazy-js-utils"><img src="https://img.shields.io/npm/dm/lazy-js-utils?style=social" alt="NPM version"></a>
<a href="https://github.com/Simon-He95/lazy-js-utils"><img src="https://img.shields.io/github/stars/Simon-He95/lazy-js-utils?style=social" alt="NPM version"></a>
</p>
<p align="center"><a href="https://lazy-js-utils-docs.netlify.app/">🖥 Docs</a></p>
<p align="center"> English | <a href="./README.md">简体中文</a></p>

At present, I have sorted out <strong>about 200</strong> commonly used functions, and I am still updating..., and your recognition is the biggest encouragement to me :hearts:

## :100: Highlights

- Pure JS utility functions, Can be used in any environment where JS can be executed
- Greatly reduced the use of `ref<HTMLElment>` and `onMounted`, which can be called directly from the script tag
- All side effect functions can return a stop function, which can stop the execution of the event anywhere, and automatically destroy the event when the page is destroyed
- API design is simple, practical and type-friendly

## &#x270B; Example

```js
import {
  animationFrameWrapper,
  insertElement,
  useEventListener,
  useMutationObserver,
} from 'lazy-js-utils'
// To listen for container changes, you don't need const container <HTMLElement>= ref
useMutationObserver('#container', (mutationsList, observer) => {
  console.log(mutationsList)
})
// requestAnimationFrame
animationFrameWrapper(
  (timestamp) => {
    // Each needle is executed 1s apart
    console.log('animationFrame', timestamp)
  },
  1000,
  true /* It is destroyed after only one execution */,
)
// Register for events
useEventListener('#container', 'click', () => {
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

## :book: Instructions for use

```bash
npm i lazy-js-utils // Installation

import {
  deepCompare
 } from 'lazy-js-utils' // Ingestion on demand

```

## 👉 [Documentation](http://vitepress.hejian.club/)

## :coffee:

[Buy me a cup of coffee](https://github.com/Simon-He95/sponsor)

## GitHub 地址

[Welcome to PR](https://github.com/Simon-He95/lazy-js-utils)

<p align="center">
  <a href=".github-contributors/Simon-He95_lazy-js-utils.svg">
    <img src=".github-contributors/Simon-He95_lazy-js-utils.svg" />
  </a>
</p>

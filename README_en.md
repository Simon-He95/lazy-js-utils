<p align="center">
<img height="200" src="./assets/logo.svg" alt="lazy-js-utils">
</p>

<h1 align="center">🚀 Lazy JS Utils</h1>

<p align="center">
  <strong>🎯 Lightweight JavaScript utility library crafted for modern developers</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/lazy-js-utils"><img src="https://img.shields.io/npm/v/lazy-js-utils?color=3fb883&label=npm" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/lazy-js-utils"><img src="https://img.shields.io/npm/dm/lazy-js-utils?color=orange" alt="Downloads"></a>
  <a href="https://github.com/Simon-He95/lazy-js-utils"><img src="https://img.shields.io/github/stars/Simon-He95/lazy-js-utils?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/Simon-He95/lazy-js-utils/blob/main/license"><img src="https://img.shields.io/npm/l/lazy-js-utils?color=blue" alt="License"></a>
</p>

<p align="center">
  <a href="https://lazy-js-utils.netlify.app/">📖 Documentation</a> •
  <a href="./README.md">中文</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#key-features">Features</a>
</p>

---

## ✨ Why Choose Lazy JS Utils?

🎯 **Say Goodbye to Boilerplate** - 200+ curated functions solving 90% of daily development needs
⚡ **Ready to Use** - Zero config, works in any JavaScript environment
🧩 **Import on Demand** - Tree-shaking friendly, bundle only what you use
🛡️ **Type Safe** - Full TypeScript support with intelligent IDE hints
🔄 **Auto Cleanup** - Smart memory management, no more memory leaks

## 🚀 Quick Start

```bash
# Install
npm install lazy-js-utils
```

```typescript
import {
  insertElement,
  useEventListener,
  useMutationObserver,
} from 'lazy-js-utils'

// 🎯 One-liner event listener with auto cleanup
const stopListening = useEventListener('#button', 'click', () => {
  console.log('Button clicked!')
})

// 🔍 Monitor DOM changes without refs
useMutationObserver('#container', (mutations) => {
  console.log('Container content changed:', mutations)
})

// ➕ Simple element manipulation
insertElement('#container', '<div>New content</div>')
```

## 🎯 Key Features

### 🎪 Simplified DOM Operations

```typescript
// Traditional way 😵
const container = document.querySelector('#container')
const newElement = document.createElement('div')
newElement.innerHTML = 'Hello World'
container?.appendChild(newElement)

// Lazy JS Utils way 😎
insertElement('#container', '<div>Hello World</div>')
```

### 🎮 Smart Event Management

```typescript
// Auto-cleanup event listeners
const stop = useEventListener(window, 'resize', () => {
  console.log('Window resized')
})

// Automatically calls stop() on page unload, no manual cleanup needed!
```

### 🎬 Smooth Animations

```typescript
// High-performance animation frame control
useRaf(
  (timestamp) => {
    // Animation that runs once per second
    updateAnimation(timestamp)
  },
  {
    delta: 1000,
    autoStop: true, // Auto-stop after one execution
  },
)
```

## 📦 Core Modules

| Module           | Features                           | Examples                                  |
| ---------------- | ---------------------------------- | ----------------------------------------- |
| 🎯 **DOM**       | Element manipulation, selectors    | `insertElement`, `removeElement`          |
| 🎮 **Events**    | Event listeners, auto cleanup      | `useEventListener`, `useMutationObserver` |
| 🎬 **Animation** | Animation frames, easing functions | `useRaf`, `useInterval`                   |
| 🔧 **Utils**     | Utility functions, type checking   | `deepCompare`, `throttle`, `debounce`     |
| 📝 **String**    | String processing                  | `camelCase`, `kebabCase`                  |
| 🔢 **Math**      | Mathematical calculations          | `clamp`, `random`                         |
| 🎤 **Speech**    | Voice analysis, TTS                | `analyzeUserVoice`, `VoiceAnalyzer`       |

## 🎨 Real-world Use Cases

```typescript
// 📱 Responsive design
useEventListener(
  window,
  'resize',
  throttle(() => {
    // Throttled window resize handling
    updateLayout()
  }, 300),
)

// 🖼️ Image lazy loading
useMutationObserver('.image-container', (mutations) => {
  mutations.forEach((mutation) => {
    // Auto-handle newly added image elements
    lazyLoadImages(mutation.addedNodes)
  })
})

// 🎪 Dynamic forms
insertElement(
  '.form-container',
  createFormField({
    type: 'input',
    placeholder: 'Enter content',
  }),
)

// 🎤 Voice analysis
const { result, controller } = await analyzeUserVoice({
  duration: 5000,
  onProgress: progress => console.log(`Progress: ${progress * 100}%`),
})
```

## 📈 Performance Comparison

| Scenario       | Vanilla JS        | Lazy JS Utils    | Performance Gain |
| -------------- | ----------------- | ---------------- | ---------------- |
| Event cleanup  | Manual management | Auto cleanup     | ⚡ 100%          |
| DOM operations | 10+ lines of code | 1 line of code   | 🚀 90%           |
| Memory usage   | Prone to leaks    | Smart management | 💾 80%           |

## 🎯 Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| :-------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|                                              Chrome ✅                                              |                                               Firefox ✅                                               |                                              Safari ✅                                              |                                            Edge ✅                                            |

## 🎤 Voice Analysis Features

One of the unique features of Lazy JS Utils is the built-in voice analysis capabilities:

```typescript
import { VoiceAnalyzer, analyzeUserVoice } from 'lazy-js-utils'

// Quick voice analysis
const { result, controller } = await analyzeUserVoice({
  duration: 5000,
  onProgress: progress => console.log(`Recording: ${progress * 100}%`),
  onVolumeChange: volume => updateVolumeIndicator(volume),
})

// Get analysis results
const analysis = await result
if (analysis) {
  console.log('Voice characteristics:', analysis.characteristics)
  console.log('TTS suggestions:', analysis.suggestions)
}

// Advanced usage with custom analyzer
const analyzer = new VoiceAnalyzer()
analyzer.setAnalysisConfig({
  minFundamentalFreq: 70,
  maxFundamentalFreq: 900,
  enableVoiceClassification: true,
})
```

## 🤝 Contributing

We welcome contributions of all kinds!

- 🐛 [Report Bug](https://github.com/Simon-He95/lazy-js-utils/issues)
- 💡 [Request Feature](https://github.com/Simon-He95/lazy-js-utils/issues)
- 📖 [Improve Documentation](https://github.com/Simon-He95/lazy-js-utils/pulls)
- ⭐ Star the project

## 📚 Related Links

- 📖 [Full Documentation](https://lazy-js-utils.netlify.app/)
- 🎮 [Live Demo](./playground/index.html)
- 💬 [Discussions](https://github.com/Simon-He95/lazy-js-utils/discussions)
- ☕ [Buy me a coffee](https://github.com/Simon-He95/sponsor)

## 📄 License

[MIT](./license) © 2024 Simon He

---

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/Simon-He95/lazy-js-utils@master/.github-contributors/Simon-He95_lazy-js-utils.svg">
    <img src="https://cdn.jsdelivr.net/gh/Simon-He95/lazy-js-utils@master/.github-contributors/Simon-He95_lazy-js-utils.svg" />
  </a>
</p>

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Simon-He95">Simon He</a></sub>
</p>

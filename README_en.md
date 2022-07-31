<p align="center">
<img height="200" src="./assets/kt.png" alt="simon-js-tool">
</p>
<p align="center"><a href="https://www.npmjs.com/package/simon-js-tool"><img src="https://img.shields.io/npm/v/simon-js-tool?color=3fb883&amp;label=" alt="NPM version"></a></p>
<p align="center"><a href="https://www.hejian.club/posts/toolsfunction">Docs</a></p>
<p align="center"> English | <a href="./README.md">简体中文</a></p>

## This article is documentation that describes the encapsulated utility functions [simon-js-tool](https://www.npmjs.com/package/simon-js-tool)
At present, I have sorted out <strong>90+</strong> commonly used functions, and I am still updating..., and your recognition is the biggest encouragement to me!

## Highlights
- Pure js tool functions, not dependent on vue, react, angular
- API encapsulation for dom operations, such as those used in vue, does not require onMounted to obtain dom nodes, and can be passed in directly using class or id
- Side effect functions, which can be destop as a result of function execution, are also automatically stopped when the page is destroyed
- Api design is simple and practical

## More
- Export function [exports-function](https://github.com/SimonHe1995/exportsFunction)
- threejs [@simon_he/s-three](https://github.com/SimonHe1995/sThree)
- Echarts [@simon_he/s-chart](https://github.com/SimonHe1995/sCharts)
- numsWheel [@simon_he/nums-wheel](https://github.com/SimonHe1995/numsWheel)
- vAxios [@simon_he/v-axios](https://github.com/SimonHe1995/vAxios)

## Sponsor me
<table >
<tr >
<td width="500" align="center">
<img width="300" src="./assets/wechat.jpg" alt="WeChat">
</td>
<td width="500" align="center">
  <img width="300" src="./assets/zfb.jpg" alt="Alipay">
</td>
</tr>
</table>

## Instructions for use
```bash
npm i simon-js-tool # Installation

import { 
  deepCompare
 } from 'simon-js-tool' # Ingestion on demand

```

## writeFile
- Quickly modify file content, support multiple files to modify at the same time
- params:
  - filePath: string | string[]  file path
  - callback: (content: string, index: number) => string Incoming file string type content can be modified to return new content
```js
writeFile('./a.js', (content) => {
  return content.replace('a', 'b')
})
```

## insertUnocssInclude
- Unocss packaged components passed in as props will lose comments) @unocss-include, this function is automatically inserted into the header of the packaged file
- params:
  - path: string | string[] File path, default is ['./dist/index.js', './dist/index.mjs']
```js
insertUnocssInclude()
```

## useIntersectionObserver
- Listen for element overlap events
- Parameters:
  - element: Element | String is observed element
  - callback: Function callback function
  - options: {
    root?: Element | Document | null; Optionally, you can specify a node as the root node of the viewport, which defaults to document.body
    rootMargin?: string; Optionally, you can specify a node as the root node of the viewport, which defaults to document.body
    threshold?: number | number[]; Optionally, you can specify one or more thresholds that trigger overlap detection, which defaults to 0
}
```js
useIntersectionObserver('.loading', (entries) => {
  // Overlapping events relative to body container.loading
})
```

## sortByOrder
- Sorts the array in the order of another array
- params:
  - arr: Array
  - prop: The name of the property in the array object
  - order: Sorts the array
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
}
]
const result = sortByOrder(arr, 'props.key', order)
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
- Export directly to a file that ends with parameters
```js
// The glsl file is available for import glsl from 'xxx.glsl
export default defineConfig({
  plugins: [
    exportPlugin('glsl'),
  ],
})
```

## insertElement
- Insert a dom element
- params:
  - parent: string | HTMLElement /* The parent element */
  - element: string | HTMLElement /* inserts the element */
  - target?: null | HTMLElement /* Insertion position (inserted to first node by default) */
```js
const div = createElement('div', {
  id: 'test',
  style: 'background: red;font-size:20px',
})
insertElement('#main', div) // Insert into the first node
insertElement('#main', 'test') // Insert into the first node
insertElement('#main', div, null) // Insert to the end
```

## removeElement
- Delete the dom element
- params:
  - element: dom element
```js
removeElement(element)
```
## findElement
- Look for the dom element
- params:
  - selector: Find the selector
  - single: Whether to look for only one element
```js
findElement('video') // <video>
findElement('video', true) // [<video>, <video>]
```

## useWebp
- Determine whether the current environment supports webp
```javascript
useWebp() // true or false
```

## calFps
- Calculate the FPS
```javascript
const stop = calFps()
stop() // Stop the calculation
```

## useResizeObserver
- Listen for browser window changes
- params:
  - callback: callback
```javascript
const stop = useResizeObserver((width,height)=>{
  console.log(width,height)
})
stop() // Stop listening
```

## useWindowScroll
- Listens for browser scroll positions
- params:
  - callback: callback
```javascript
const stop = useWindowScroll((left,top)=>{
  console.log(left,top)
})
stop() // Stop listening
```

## useElementBounding
- getBoundingClientRect encapsulation
- params:
  - element: string | Element
```javascript
const rect = useElementBounding('#id')
```

## useMutationObserver
- MutationObserver encapsulation
- params:
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
stop() // stop mutation observer
```

## sliderValidation
- Slider verification function
- params:
  - url: Background image url
  - container: Slider container
  - width: Slider size default 42px
  - callback: The slider validates the success callback function
```javascript
sliderValidation('/assets/image.jpg', document.body)
```

## picInPic
- Switch video-in-picture mode
- params:
  - video: string | HTMLVideoElement
```javascript
const toggle = picInPic('#video')
toggle() // Switch video-in-picture mode
```

## shareScreen
- Browser screen sharing
- Some browsers may have compatibility issues
- The browser requires authorization
- params:
  - container: A display container for screen sharing
  - callback: Callback when sharing is stopped
```javascript
shareScreen('#main',() => {
  console.log("Sharing has stopped");
});
```

## dbStorage
- Browser big data storage
- The storage capacity is more than 250MB
- Homology policy
- Asynchronous operations
- Persistent storage
- Supports binary storage
```javascript
  const { add, read, remove } = await dbStorage()
  set('key', { video:Blob }) // Add data or update data key: string | number, value: object
  read('key') // Read the data key: string | number, 返回 { video:Blob }
  remove('key') // Delete data key: string | number
```

## waterfall
- Waterfall layout
- The width is fixed
- Support for appending new images
- params:
  - urlList: Picture address list
  - container: Parent container default body
  - width: Picture width default 200
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
  if (isBottom()) { // Touch the bottom to add a new image
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
- Click to drag and drop to release the event encapsulation
- Mobile touch will have a better experience, but it is different from the event of the mouse
- DragEvent will switch touch events on the mobile side, and use the mouse event on the PC side, keeping the received event objects basically the same
- params:
  - target: string | HTMLElement The target element
  - options: { dragStart: (e) => void /* Press */, dragMove: (e) => void /* Drag and drop */, dragEnd: (e) => void /* Drag and drop */ }
    - trigger: Boolean /* defaults to false, triggered when moving on the container, and only when pressed to move on the target element when true */
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
- Picture compression function
- Promise
- params:
 - source: Image path | Image base64 | Image blob
  - options: { quality: number /* Compression quality */  maxWidth: number /* Picture width */  maxHeight: number /* The height of the picture */  type: 'Blob' | 'base64' | 'blob' /* ReturnType */ }
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
- Add an event function to the element
- Returns a delete function
- params:
  - target: Element | string  /* The target element */
  - eventName: string  /* The event name */
  - callback: (e)=>void /* The callback function */
  - capture: boolean  /* Whether to capture */
  - autoRemove: boolean /* Whether to automatically remove the event */
```javascript
const remove = addEventListener('#btn',
  'click',
  () => {
    console.log('click')
  }
)
addEventListener(document,'DOMContentLoaded', () => {
  console.log('I do it once, and then the event is automatically removed')
}, false, true)
```
## createElement
- Create the dom function
- params:
  - tagName: string  /* Element tag name */
  - attrs: object /* Element property object */
```javascript
const div = createElement('div', {
  class: 'className',
  style: 'color: red;',
  style: 'color: red;font-size: 20px;'',
})
```
## sleep
- Sleep function
- params:
  - time: Sleep time (in milliseconds)
  - callback: Callback function after sleep ends
```javascript
  sleep(1000, () => {
    console.log('End of sleep')
  })
  // await sleep(1000)
```

## htmlTransform
- Turn the template string back to the string after the ast operation
- Only simple operations for html are supported, not for js operations
- It can be used for the conversion of different channels of the Mini Program, the replacement of some special placeholders, the replacement insertion and deletion of templates, and so on

```javascript
  const code = await htmlTransform('<div class="_ee">hello</div><view bindtap="xx"></view>', {
    div(node, { setAttribs,beforeInsert, afterInsert }) {
      node.name = 'p'
      setAttribs('age','19')
      beforeInsert('<span>hi</span>')
      afterInsert('<span>你好</span>')
    },
    '*'(node){
      // All nodes will enter here
    },
    "$attr$_ee"(node){
      // $attr$ matches nodes where _ee attribute exists
    },
    "$attr$bindtap"(node,{ renameAttribs }){
      renameAttribs('bindtap','onTap')
    }
  })
  console.log(code) // <span>hi</span><p age="19" class="_ee">hello</p><span>你好</span><view onTap="xx"></view>
```

## idleCallbackWrapper
- A wrapper function that wraps the requestIdleCallback and the cancelIdleCallback
- Compatible with different versions of the browser
- Simplified invocation
- Returning a stop method stops execution
- The default on tasks is [], auto is stop
- The default timeout is 2000
- params:
  - tasks: An array of tasks to be executed
  - timeout: Timeout (in milliseconds)
  - callback: Execute the callback function after completion
```javascript
// idleCallbackWrapper(tasks,()=>{console.log('end')}) // The default second parameter is shorthand for 2000
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
// Scene before encapsulation
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

// 封The scene after installation is more brief and convenient
const stop = idleCallbackWrapper(tasks, 1000)
```

## animationFrameWrapper
- Wrapped in the package functions of requestAnimationFrame and cancelAnimationFrame
- Compatible with different versions of the browser
- Simplified invocation
- Returning the stop method stops the animation
- params:
  - fn: The function to be executed
  - timeout: Timeout (in milliseconds) = 1000
  - autoStop: Stop the animation after one execution
```javascript
const count = ref(0)
// Scene before encapsulation
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
// The encapsulated scene is more brief and convenient
const stop = animationFrameWrapper(() => {
  count.value++
  if (count.value > 10) {
    stop()
  }
}，1000)
```

## DotImageCanvas
- Converts the pixels of a picture to a dot matrix picture
- params:
  - src: Picture path
  - fontWeight: The thickness of the dot matrix
  - color: The color of the dot matrix defaults to the original picture color
- The dotImage.status in dotImage.repaint(xxx) in await repaint can be used to determine when the correct src is loaded
```javascript
const dotImage = new DotImageCanvas('./img/1.jpg', 1, '#000')
document.body.appendChild(dotImage.canvas)
// If there is an update, you can call dotImage.repaint('xxx', 'xxx', x) to update, the url will take the last picture, only update the color and thickness
setTimeout(() => {
  dotImage.repaint('./img/1.jpg', 1, '#000')
}, 1000)
```

## exportsCode
- Get the file content in the node environment
- If it is a json-formatted file, the json object is returned, otherwise string is returned
```javascript
const pkg = await exportsCode('../package.json') // {name: 'simon-js-tool', version: '1.0.0' ...}
console.log(pkg.name) // 'simon-js-tool'
console.log(await exportsCide('../.npmrc')) // 'shamefully-hoist=true'
```

## fileSplice
- Large file slice handling function
- params:
  - file: File file object
  - size: Slice size (in bytes) = 100kb // The maximum number of slices is set to 100 and the size is File.size / 100
- Returns an array of slices
```javascript
// fileSplice(file: File, chunkSize: number = 1024 * 100) 
const chunks = fileSplice(file, 1024 * 1024) // [ { file: Blob, filename: string } ]
```

## pwdLevel
- Judge the strength of the numbers
- params:
  - num: Judge the strength of the numbers ...
  - min: The minimum length of the number
- return: Intensity level 0-4
```javascript
const levels = ['', 'Low', 'Medium', 'High', 'Extremely High']
console.log(levels[pwdLevel('123456')]) // Low
console.log(levels[pwdLevel('123456', 7)]) // ''
console.log(levels[pwdLevel('q123456')]) // High
```

## sort
- Array sorting
- params:
  - arr: The array to be sorted
  - regular: Collation, regular number[], 1 ascending, -1 descending, default ascending; Complex types require custom collation ['name'], install array objects name property ascending, etc...
- Supports ascending descending and multi-criteria sorting
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
- Generate a signed canvas template
- params:
  - width: Canvas width
  - height: canvas Height
```javascript
const signature = new CreateSignatureCanvas(400, 400)
signature.mount('#main') // Mount the canvas to the element with id 'main'
signature.unmount() // Unmount the canvas
const base64 = signature.save()
signature.clear() // Clear the signature
```

## DotTextCanvas
- Returns a lattice of canvas based on text
- params
  - text: text
  - fontSize: Font size
  - color: Font color
  - fontWeight: Lattice thickness
```javascript
// You can tell from dotText.status whether the loading is complete, and if the loading is complete, you can call dotText.repaint(xxx) to update the text
const dotText = DotTextCanvas('hello', 20, '#000', 1)
document.body.appendChild(dotText.canvas)
```

## getLru
- Record limited data and delete data that has not been accessed for the longest time
- params:
  - max: The maximum number of caches
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
- Converts html strings to entity strings
- params:
  - html: html string
```javascript
console.log(excapeHtml("< a href=" ">xx</ a>")) // "&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;"
```

## unescapeHtml
- Converts an entity string to an html string
- params:
  - html: Entity string
```javascript
console.log(unescapeHtml('&lt; a href=&quot; &quot;&gt;xx&lt;/ a&gt;')) // "< a href=" ">xx</ a>"
```

## timeCost
- Calculates the function execution time
- params:
  - fn: function
```javascript
timeCost(()=>{
  let a = 1
  for(let i=0;i<1000;i++){
    a++
  }
}) // 输出: timeCost: 0.046s
```

## log
- Simplify the use of console .log
- params:
  - msg: Printed information
  - color: The color of the print
  - fontSize: The font size of the print
```javascript
log('hello world') // hello world
```

## copy
- js controls the copied content
- params:
  - str: Copied content
```javascript
btn.onclick = () =>  {
  if(copy(textarea.value)){
    alert('Replication succeeded')
  }
}
```

## getDateList
- Gets a list of dates for how many days are positive or negative in the specified date range
- params:
  - startDate: Start date
  - days: How many days are positive or negative
```javascript
console.log(getDateList('1991/3/02', 7)) // [ '1991-3-02', '1991-3-03', '1991-3-04', '1991-3-05', '1991-3-06', '1991-3-07', '1991-3-08' ]
```

## isType
- `isType(o:any, type:string)`: Determine if obj is of type type
- 参数:
  - o: The object to be judged
  - type: The type to be judged // If it is multiple types, use '|' Delimited as: abbreviation - 'O| S' Full Write - 'Object| String'
```javascript
console.log(isType(1, 'Number')) // true
console.log(isType('1', 'N')) // false
console.log(isType({}, 'O | A')) // true (Object | Array)
console.log(isType(new Promise(), 'P')) // true (Promise)
console.log(isType(function(){}, 'P | F')) // true (Promise | Function)
```

## randomDate
- Randomly generated dates
- params:
  - startDate: Start date 1999/01/01 Support/or-
  - endDate: End date
```javascript
// The default of end is the current date
console.log(randomDate('1999/01/01')) // Mon Jun 06 2011 15:11:37 GMT+0800 (中国标准时间) Can then be converted to other formats such as 'yyyy-MM-dd' via formatDate
```

## uniqueArray
- Remove duplicate elements from the array
- Support for removing duplicate elements of objects in an array
```javascript
// Compare the values exactly to determine if they are duplicated
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
- Compare two objects deeply
- ignoreKeys Ignores that the specified keys can be arrays or regular expressions
- params:
  - a: The object to be compared
  - b: The object to be compared
- Comparing the differences between 2 objects returns different properties and specifically different values
- Returns {error:[], errorMsg:[]} format, error corresponds to different properties, and errorMsg corresponds to different values and positions of different properties
- If both objects are the same, {error:[], errorMsg:[]}, error is empty, errorMsg is empty
```javascript
// params: { obj1: any, obj2: any, ignoreKeys: string[] | RegExp }
const obj1 = {a:1,b:2,c:3}
const obj2 = {a:1,b:2,c:3}
const obj3 = {a:1,b:2,c:4}
deepCompare(obj1,obj2) // {error:[],errorMsg:[]}
deepCompare(obj1,obj3) // {error:['c'],errorMsg:['3','4']}
```
## deepMerge 
- A deep copy version of Object.assign
- params:
  - a: The object to be returned
  - ...args: The object to be merged
- Multiple parameters can be accepted, with the same attributes of the same hierarchy existing, with the latter overriding the former
- Returns the first object
```javascript
// params:  params: { target: Record<any, any>, ...sources: Record<any, any>[] } => target
const target = { a: 1, b: 2, c: { d: 3, e: 4 } }
const source1 = { b: 4, c: { d: 5 } }
const source2 = { c: { e: 6 } }
const result = deepMerge(target, source1, source2)
console.log(result) // { a: 1, b: 4, c: { d: 5, e: 6 } }
```
## asyncPool 
- Controls the number of asynchronous concurrent executions
- params:
  - max: Maximum number of concurrency
  - fn: Promise[]
```js
// limit Number of concurrency , tasks httpRequest[]
asyncPool(limit, tasks).then((results) => {
  // results is an array of results
})
```

## quickFind 
- quickFind(array: any[], key: any) ,Returns a new instance
- params:
  - array: The array to be found
  - key: The key to be found, according to the key to find
- In the example, the find method can find the corresponding term -O(1) according to the key
- set update or new item-O(1)
- delete delete item-O(1)
```javascript
const find = quickFind([{id:1,name:'simon'},{id:2,name:'simon'}],'id')
find.find(1) // find: id = 1 => {id:1,name:'simon'}
find.set({id:1,name:'simon'})
find.delete(1) // delete: id = 1 => {id:1,name:'simon'}
```
## quickFilter 
- Quickly fuzzily find items and values for key names such as: 'name=/h/'
- params:
  - array: The array to be filtered
  - key: The key to be filtered, filtered according to the key, supports the regular matching of the key name of the key and the value of the item
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
- Deep copy of an object
- Circular dependencies are supported
- Complex types are supported
- Lightweight deep copy
- params:
  - obj: The object to be copied
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
const obj2 = deepClone(obj) // Returns a new object
```
## curry 
- Currification of functions
- params:
  - fn: The function to be curried
```javascript
const add = (a, b) => a + b
const add1 = curry(add)
const add2 = add1(1)
const add3 = add2(2)
add3(3) // 6
```

## memorizeFn 
- Returns a function that caches the result based on the arguments
- params:
  - fn: The function to be cached
```javascript
let count = 0
const fn = memorizeFn(()=> count++)
fn()
fn()
console.log(count) // => 1
```

## debounce 
- Function stabilization
- params:
  - fn: The function to be stabilized
  - delay: Delay time
```javascript
const f = debounce(() => {
  console.log('debounce')
}, 1000)
```
## throttle 
- Function throttling
- params:
  - fn: The function to be throttled
  - delay: Delay time
``` javascript
  const f = throttle(() => {
    console.log('throttle')
  }, 1000)
```

## traverse 
- Iterate over objects or arrays to quickly get the value in the arr from the function name in options
- The function receives target-currently traversed value, index-currently traversed index, item-currently traversed item
- You can specify multiple properties
- Use a traderse approach similar to babel's
- Usage Scenarios: Quickly extract certain properties from your data and transform them into new data structures
- params:
  - target: The object or array to be traversed
  - options: Multiple functions, with function names, to get the item value of a key in an object or array
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
- Supports multi-level keys
- Converts the object's key to the desired key
- params:
  - obj: The object to be converted
  - options: The key to the conversion is set by a key-value object, which can be used through the . to set up a multi-level key
- Scenario: The front-end definition field has a different key on the backend, for example, the key of the backend is id, and the key of the front-end is _id
```javascript
// transformKey(obj, { 'family.name': 'familyName', 'family.age': 'familyAge' })
const obj = {
  family: {
    name: 'simon',
    age: 18
  },
  name: 'simon'
}
const newObj = transformKey(obj, { // Convert obj's key into a new key
  'family.name': 'familyName',
  'family.age': 'familyAge'
})
console.log(newObj)
// { familyName: 'simon', familyAge: 18, name: 'simon' }
```


## once
- A function that executes only once
- params:
  - fn: A function to be executed once
```javascript
document.addEventListener('click', once(() => {
  console.log('click')
}))
document.click() // click
document.click() // 
```

## VFetch
- Fetch-based axios API-style promise request wrapping
- Repeating a request if the previous request is not completed cancels the previous request and re-initiates the request
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
  url: string // Request address
  Keepalive?: The boolean // property is used when the page is unloaded, telling the browser to keep the connection in the background and continue sending data
  body?: any // body parameter {}, GET requests are merged after url
  Integrity?: The string // attribute specifies a hash value that checks whether the data sent back by the HTTP response is equal to this preset hash value.
  referrer?: The string // attribute is used to set the referer header for fetch() requests.
  referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'same-origin'
  method?: Method // Request Type The default GET 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' supports vFetch.get | post | delete | Put in the form
  credentials?: Credentials // Request with cookie Default of ofomi 'include' | 'same-origin' | 'omit'
  params?: Record<tring, string> // Request parameters determine whether they will be serialized according to the bodyType
  responseType?: ResponseType // Return Type Default json 'formData' | 'text' | 'blob' | 'arrayBuffer' | 'json'
  bodyType?: BodyType // Request Type Default json 'json' | 'form' | 'file'
  cache?: Cache // Cache type The 'no-cache' | is not cached by default 'default' | 'force-cache' | 'only-if-cached'
  Redirect?: The Redirect // property specifies how HTTP jumps are handled. The possible values are as follows: default follow: follow redirect, error: throw error, manual: manual processing
  mode?: Mode // cors, no-cors, same-origin default cors cors: cross-domain, no-cors: not cross-domain, same-origin: homologous
  signal?: AbortSignal // Cancels the requested signal
  cancel?: () = > void // method to cancel the request
  transformResponse?: (response: Response) = > Response // Response data conversion
}

interface IFetchOptions {
  baseURL?: string // base url
  timeout?: number // Timeout ms defaults to 20000
  headers?: Record<tring, any> // request header For example: {'Content-Type': 'application/json'}
  interceptors?: IFetchInterceptors // Request Interceptor
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

request.get({ // Cancels the previous request
  url: 'nihao',
  responseType: 'text',
}).then((res: any) => {
  console.log(res)
})
```


## stringify
- params:
  - obj: The object to be converted
```javascript
console.log(stringify({ user: 'simon', age: '18' })) // 'user=simon&age=18'
```
## parse
- params:
  - str: The string to be converted
```javascript
console.log(parse('user=simon&age=18')) // { user: 'simon', age: '18' }
```
## jsCookie
```javascript
jsCookie.set('name', 'simon') 
console.log(jsCookie.get('name')) // 'simon' 
jsCookie.remove('name')  
console.log(jsCookie.get('name')) // ''
```
## uuid
- Generate uuid 
- params:
  - len: Length Defaults to 8
  - radix: The default value for base is 16
- Support limiting the length and type of generated uuid 
```javascript
console.log(uuid()) // '71A793A9-BBAE-49FC-B957-5BC71E5AD044'
console.log(uuid(16, 'hex')) // 'a0b1c2d3e4f5' 
console.log(uuid(8, 2)) // '11110011'
```
## formateDate
- Format the date
- params:
  - date: date
  - fmt: Format Default is 'yyyy-MM-dd'
```javascript
console.log(formateDate(new Date(), 'yyyy-MM-dd')) // '2019-01-01'
```
## monitorPef
- Digitize browser performance metrics
- Redirect time Redirect time Redirect time First screen time Previous page unload time Browser read cache time DNS resolution time TCP completion handshake time HTTP request response completion time Time DOM time before starting loading DOM load completion time Script load time onload event time Page full load time 
``` javascript
monitorPef() 
/*
Redirect time 0
Number of redirects 0
First screen time 414
Last uninstall time 0
Browser read cache time 28.200000047683716
DNS resolution time 0
TCP completes the handshake time 0.3097000000476837
HTTP request response completion time 0.026600000143051146
The time it takes before the DOM starts loading is 0.36460000014305116
DOM load completion time 2.600299999952316
Script load time 0.00040000009536743164
Onload event time 0
Page full load time 3.0144000000953675
*/
```
## getLocation
- Obtain geolocation information based on promise packaging
- params: 
  - enableHighAccuracy: boolean /* High precision */ 
  - timeout: number /* Timeout period */ 
  - maximumAge: number /* Cache time */
```javascript
console.log(await getLocation()) //  { enableHighAccuracy: boolean = false, timeout: number = 5000, maximumAge: number = 0 }
```
## getDevice
- Get system information
- os: system dev: browser
```javascript
console.log(getDevice()) // { os: 'android', dev: 'chrome' }
```
## preload
- Preloaded images
- params:
  - src: Picture path or collection of picture paths
```javascript
preload('https://img.yzcdn.cn/vant/cat.jpeg')
preload(['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/dog.jpeg'])
<img src="https://img.yzcdn.cn/vant/cat.jpeg" /> // memory cache
```

## lazyLoad
- Pictures load lazily
- params:
  - element: Image element, if it is an attribute, will automatically get the element
  - params-1: A collection of pictures element | Element[] | NodeList[] | class | id | tagName 
  - params-2: Root specifies that the relative container defaults to body 
  - params-3: rootMargin specifies margins relative to the container When loading at default distance of 200px from the bottom of the container (↑ → ↓ ←) '0px 0px 200px 0px' 
  - params-4: Threshold Specifies the threshold at which images are loaded
```javascript
// usage
// By default, the image that displays src is replaced by data-src when scrolling to the image
  lazyLoad(document.querySelectorAll("img"));
  lazyLoad("img[data-src]");
  lazyLoad(".img-wrapper>img");
// template
  <img src="temp" data-src="../public/favicon.svg" alt="" h-10 bg-red />
```

## addScript
- Dynamically add the script tag to put => head
- params:
  - src: Script path
```javascript
addScript('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js')
```

## addLink
- Dynamically add link tags to put = > head
- params:
  - src: Link path
```javascript
addLink('https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css')
```

## addStyle
- Dynamically add style tags = > head
- params:
  - str: Style content
```javascript
/* 
<style>
 .test {
  color: red;
 }
</style>
Insert the cup into the head tag
*/
addStyle(`
  .test {
    color: red;
  }
`)
```
## download
- Download the file
- params:
  - url: The file path
  - filename: filename
```javascript
// Download a picture named baidu .png addressed as https://www.baidu.com/img/bd_logo1.png
download('https://www.baidu.com/img/bd_logo1.png', 'baidu.png')
```

## trim
- The string is stripped of spaces
- params:
  - str: string
  - type: Removes the space type, and by default removes the front and back spaces
```javascript
trim(str: string,type: 'pre' | 'post' | 'around' | 'all' = 'around') 
console.log(trim('  h e l l o  ')) // 'h e l l o'
console.log(trim('  h e l l o  ', 'pre')) // 'h e l l o  '
console.log(trim('  h e l l o  ', 'post')) // '  h e l l o'
console.log(trim('  h e l l o  ', 'all')) // 'hello'
```

## compressCss
- Compress css
- params: 
  - str: CSS content
```typescript
compressCss(css: string): string
```

## scrollToTop
- Back to the top
```javascript
// Slowly get back to the top
scrollToTop()
```

## createEventBus
- createEventBus() 
- emit Event sending
- on Event listening
- off Event cancellation
- Create an instance of the publish-subscribe pattern
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
- Randomly generates hexadecimal colors
```javascript
console.log(randomHexColor()) // '#ff0000'
```

## randomRgb
- Randomly generate RGB colors
```javascript
console.log(randomRgb())// 'rgb(255,0,0)'
```

## httpsRedirect
- https redirection
```javascript
// http://www.baidu.com => https://www.baidu.com
httpsRedirect()
```

## scrollToView
- Scrolls to the specified element
- params:
  - element: Visual target element
```javascript
scrollToView(el: HTMLElement | string)
```

## getScrollPosition
- Gets the scroll position
```javascript
console.log(getScrollPosition()) // { x: number, y: number }
```

## camelize
- camelize
- params:
  - str: string
```javascript
console.log(camelize(hello-world)) // 'helloWorld'
```

## hyphenate
- hyphenate
- params:
  - str: string
```javascript
console.log(hyphenate(helloWorld)) // 'hello-world'
```

## getUrlParam
- Gets the url parameter
- params:
  - url: string // url address, the default gets the url parameter of the current page
```javascript
console.log(getUrlParam('?name=simon&age=18'))// { name: 'simon', age: '18' }
```

## fullScreen
- fullScreen()
- Full screen
```javascript
fullScreen()
```

## exitFullScreen
- exitFullScreen()
- Exit full screen
```javascript
exitFullScreen()
```

## toBase64
- blob | file | Url is converted to base64
- params:
  - blob: blob对象 | file: file对象 | url: string // Picture address
```typescript
toBase64(file: File, type: 'file' | 'blob' | 'url' = 'url'): string
```

## base64ToFile
- Convert base64 to file
- params:
  - base64: string // Base64 string
  - name: string // filename
```typescript
base64ToFile(s: string, name: string): File
```

## base64ToBlob
- Convert base64 to blob
- params:
  - base64: string // Base64 string
```typescript
base64ToBlob(s: string): Blob
```

## uppercaseNum
- Converts numbers to uppercase letters
- params:
  - num: number // Number
```javascript
// uppercaseNum(num: number | string) => string
console.log(uppercaseNum(1)) // '一'
```

## formateNum
- Format the numbers
- params:
  - num: number // Number
  - decimals: number // Number of decimal places, default is 2
  - integer: 'floor' | 'ceil' Decimal interception method floor: rounded down ceil: rounded up
```javascript
// formateNum(number: number | string, decimals = 2, integer: 'floor' | 'ceil' = 'ceil') => string
console.log(formateNum(12253.123, 2)) // '12,253.12'
```

## interceptError
- Exception interception
- Arguments: Functions that may have exceptions, return an error handler of type promise
- Can avoid constant try... catch
- params:
  - fn: Functions that may have exceptions
```javascript
// interceptError(fn: Function) => Promise<any>
interceptError(() => { throw new Error('error') }).catch(err=>{ console.log(err) })
```
## isBottom
- Tell if scrolling bottoms out
- distance: The distance from the bottom is used as the criterion for bottoming out by default 0
```javascript
// isBottom(distance: string = 0): boolean
console.log(isBottom()) // false
```

## calNum
- Calculate numbers
- type: 'add' | 'Minus' | 'Multiply' | 'Divide'
- Parameters:
  - num1: number // The number 1
  - ...args: number[] // The number n
```javascript
console.log(calNum.add(0.1, 0.2, 0.2)) // 0.5
console.log(calNum.div(0.1, 0.2, 0.2)) // 2.5
console.log(calNum.sub(0.1, 0.2, 0.2)) // -0.3
console.log(calNum.mul(0.1, 0.2, 0.2)) // 0.004
```

## ruleJudgment
- isMobile  - Determine if it is a mobile phone number
- isEmail - Determine if it is a mailbox
- isIdCard - Determines if it is an ID card
- hasCn - Determines whether there is Chinese
- isFile - Determine if it is a File type
- isBlob - Determine if it is a Blob type

## GitHub地址
[Welcome to PR](https://github.com/Simon-He95/simon-js-tool)

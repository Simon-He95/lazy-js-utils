/**
 * 单例模式
 * @description EN: Create a singleton proxy for a class so constructing it always returns the same instance.
 */
export function singleModel(className: any) {
  let ins: any
  return new Proxy(className, {
    construct(Target, args) {
      if (!ins)
        ins = new Target(...args)
      return ins
    },
  })
}

// class Video {
//   constructor() {
//     console.log('video created');
//   }
// }
// const vi = singleModel(Video)
// const v1 = new vi()
// const v2 = new vi()
// console.log(v1 === v2);

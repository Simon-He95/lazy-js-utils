// 声明 .lrc 文件的模块类型
declare module '*.lrc' {
  const content: string
  export default content
}

// 声明 .lrc?raw 的模块类型
declare module '*.lrc?raw' {
  const content: string
  export default content
}

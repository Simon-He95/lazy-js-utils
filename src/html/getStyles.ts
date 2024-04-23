export const stylesReg
  = /(<.* style=['"]([ \w$\-\_:;\n]*)['"][\/ "'$\-_\w]*>)/gm

/**
 *
 * @param { string } str 字符串模板
 * @param { Function } callback 读取style时的回调
 * @returns
 */

export function getStyles(
  str: string,
  callback: (style: string, block: string, index: number) => string,
) {
  let index = 0
  return str.replace(stylesReg, (match, block, style) =>
    match.replace(style, callback(style, block, index++)))
}

// const str = `
// <script setup lang="ts">
// const props = defineProps<{ modelValue: boolean }>()
// </script>

// <template>
//   <div class="red yellow my-class my_class my$c class1" style="background: yellow;color:red;" >asdas</div>
//   <div class="red yellow my-class my_class my$c class1" style="background: yellow" />
// </template>

// <style scoped>
// .red {
//   color: red;
//   font-size: 14px;
// }
// .red .a {
//   color: yellow;
// }
// </style>
// `
// console.log(getStyles(str, (style, block, index) => {
//   console.log(style)
//   return style + 'nihao'
// }))

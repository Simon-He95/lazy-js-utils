export const classesReg = /(<.* class=["']([\w\-$ ]*)["'\-\w$=:/ ]*>)/g
export function getClasses(
  str: string,
  callback: (classes: string, block: string, index: number) => string,
) {
  let index = 0
  return str.replace(classesReg, (match, block, classes) =>
    match.replace(classes, callback(classes, block, index++)))
}

// const str = `
// <script setup lang="ts">
// const props = defineProps<{ modelValue: boolean }>()
// </script>

// <template>
//   <div class="red yellow my-class my_class my$c class1" style="background: yellow" >asdas</div>
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
// getClasses(str, (classes, block, i) => {
//   return classes + 'nihao'
// })

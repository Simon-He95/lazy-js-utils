<script setup lang="ts">
import { fileSplice } from '../../src'
// import { lazyLoad } from "../../src";
// import { vFetch } from "../../src";
// const upload = ref(null)
// onMounted(() => {
//   upload.value.addEventListener('change', (e) => {
//     const _file = upload.value.files[0]
//     fileSplice(_file)
//   })
// })
// setTimeout(() => {
//   vFetch({
//     url: "test1",
//   }).then((res: any) => {
//     // console.log(res)
//     return res;
//   });
// }, 2000);
// onMounted(() => {
//   lazyLoad(document.querySelectorAll("img"));
//   lazyLoad("img[data-src]");
//   lazyLoad(".img-wrapper>img");
//   // document.querySelectorAll("img").forEach((img) => {
//   //   lazyLoad(img);
//   // });
// });
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    上传:<input ref="upload" type="file" name="" value="">
    <router-view />
    <Footer />
  </main>
  <!-- <img src="temp" data-src="../public/favicon.svg" alt="" h-10 bg-red /> -->
  <!-- <img src="temp" alt="" h-10 bg-red /> -->
</template>

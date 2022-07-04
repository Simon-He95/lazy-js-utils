<script setup lang="ts">
import { fileSplice, sCharts } from '../../src'

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
// onMounted(() => {
sCharts(
  '#main',
  {
    w: 400,
    h: 300,
    theme: 'dark',
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [
          10,
          22,
          28,
          {
            value: 43,
            // 设置单个柱子的样式
            itemStyle: {
              color: '#91cc75',
              shadowColor: '#91cc75',
              borderType: 'dashed',
              opacity: 0.5,
            },
          },
          49,
        ],
        itemStyle: {
          barBorderRadius: 5,
          borderWidth: 1,
          borderType: 'solid',
          borderColor: '#73c0de',
          shadowColor: '#5470c6',
          shadowBlur: 3,
        },
      },
    ],
  },
  true,
)
// });
</script>

<template>
  <main font-sans p=" y-10" text="center gray-700 dark:gray-200">
    <div id="main" w-full ma inline-block />
    <Footer />
  </main>
  <!-- <img src="temp" data-src="../public/favicon.svg" alt="" h-10 bg-red /> -->
  <!-- <img src="temp" alt="" h-10 bg-red /> -->
</template>

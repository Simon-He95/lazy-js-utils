<script setup lang="ts">
// import { vFetch } from "../../src";

// setTimeout(() => {
//   vFetch({
//     url: "test1",
//   }).then((res: any) => {
//     // console.log(res)
//     return res;
//   });
// }, 2000);
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <router-view />
    <Footer />
  </main>
</template>

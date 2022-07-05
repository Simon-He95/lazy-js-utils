<script setup lang="ts">
import { compressImage, dragEvent, fileSplice, numWheel } from '../../src'

numWheel('#main', {
  startVal: 5,
  endVal: 900000.99,
  duration: 500,
  animation: 'countdown',
})
</script>

<template>
  <main p=" y-10" text="center gray-700 dark:gray-200">
    <div>
      <div id="main" font-mono text-2xl />
    </div>
    <Footer />
  </main>
  <!-- <img src="temp" data-src="../public/favicon.svg" alt="" h-10 bg-red /> -->
  <!-- <img src="temp" alt="" h-10 bg-red /> -->
</template>

<script setup lang="ts">
import {
  compressImage,
  dbStorage,
  dragEvent,
  fileSplice,
  numWheel,
  picInPic,
  useElementBounding,
} from '../../src'

const toggle = picInPic('#video')
</script>

<template>
  <main p=" y-10" text="center gray-700 dark:gray-200">
    <div>
      <div id="main" font-mono text-2xl h-500 />
    </div>
    <video
      id="video"
      width="500"
      height="500"
      src="https://static.newcger.com/uploads/preview/ae/2022/07/51629.mp4"
      controls
    />
    <button @click="toggle()">
      toggle
    </button>
    <Footer />
  </main>
</template>

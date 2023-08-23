<script setup lang="ts">
import { picInPic } from '../../src'
const toggle = picInPic('#video')
</script>

<template>
  <main p=" y-10" text="center gray-700 dark:gray-200" style="width: 100px">
    <div h-200>
      <div id="main" font-mono text-2xl />
    </div>
    <audio controls src="../public/aini.mp3" />
    <video
      id="video"
      width="500"
      height="500"
      max
      src="https://static.newcger.com/uploads/preview/ae/2022/07/51629.mp4"
      controls
    />
    <table class="table">
      <tr>
        <th>column1</th>
        <th>column2</th>
        <th>column3</th>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
    </table>
    <button @click="toggle()">
      picinpic
    </button>
    <Footer />
  </main>
</template>

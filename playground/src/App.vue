<script setup></script>

<template>
  <div v-if="isShow" @click="handleClick">
    <h1>Vue 3 Playground</h1>
    <p>Start editing to see some magic happen :)</p>
  </div>
  <div v-else />
</template>

<style scoped></style>

<script setup lang="ts"></script>

<template>
  <div class="swiper-container" ma style="width: 100%">
    <div class="swiper-wrapper">
      <div class="swiper-slide w-2">
        Slide 1
      </div>
      <div class="swiper-slide w-20">
        Slide 2
      </div>

      <div class="swiper-slide">
        Slide 3
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-container {
  width: 300px;
  height: 200px;
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
  width: 300%;
  animation: slide 10s infinite;
  animation-play-state: running;
}

.swiper-slide {
  flex: 1;
  width: 100%;
}

/* 鼠标移入时暂停动画 */
.swiper-container:hover .swiper-wrapper {
  animation-play-state: paused;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  33.33% {
    transform: translateX(-100%);
  }
  66.66% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

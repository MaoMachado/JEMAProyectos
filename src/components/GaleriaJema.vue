<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  },

  autoplay: {
    type: Boolean,
    default: true
  },

  interval: {
    type: Number,
    default: 3000
  }
})

const currentIndex = ref(0);
let timer = null;

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const handleKeydown = (e) => {
  if (e.key === "ArrowRight") {
    next()
  }
  if (e.key === "ArrowLeft") {
    prev()
  }
}

onMounted(() => {
  if (props.autoplay) {
    timer = setInterval(next, props.interval)
  }

  window.addEventListener("keydown", handleKeydown)
})

onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener("keydown", handleKeydown)
})
</script>

<template>
  <section class="carrusel" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
    <div class="carrusel-inner">
      <img :src="props.images[currentIndex]" :alt="`Imagen ${currentIndex + 1}`">
    </div>

    <button class="control prev" @click="prev">⬅️</button>
    <button class="control next" @click="next">➡️</button>

    <div class="indicators">
      <span v-for="(img, i) in props.images" :key="i" class="dot" :class="{ active: i === currentIndex }"
        @click="currentIndex = i"></span>
    </div>
  </section>
</template>
<style scoped lang="scss">
.carrusel {
  width: 100%;
  max-width: 450px;
  margin-inline: auto;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  & .carrusel-inner {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease-in-out;
    }
  }

  & .control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0);
    border-radius: 1rem;
    border: none;
    color: white;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    z-index: 2;
    transition: background 0.1s ease;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  & .indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    position: absolute;
    bottom: 10px;
    width: 100%;

    & .dot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #ccc;
      cursor: pointer;
      transition: background 0.2s ease;

      &.active {
        background: #3b82f6;
      }
    }
  }
}
</style>

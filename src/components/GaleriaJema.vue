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

/** Swipe Variables */
let touchStartX = 0;
let touchEndX = 0;

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

/** Switch Logic */
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].clientX
  handleSwipe();
}

const handleSwipe = () => {
  const diff = touchStartX - touchEndX

  // Si el movimiento es significativo (>50px)
  if (Math.abs(diff) > 50) {
    if (diff > 0) next() // Swipe izquierda → siguiente
    else prev()          // Swipe derecha → anterior
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
  <section class="carrusel" @mouseenter="isPaused = true" @mouseleave="isPaused = false" @touchstart="handleTouchStart"
    @touchend="handleTouchEnd">

    <transition name="fade-slide" mode="out-in">
      <div class="carrusel-inner" :key="currentIndex">
        <img :src="props.images[currentIndex]" :alt="`Imagen ${currentIndex + 1}`">
      </div>
    </transition>

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
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  &:hover .control {
    opacity: 0.85;
  }

  & .carrusel-inner {
    width: 100%;
    height: 50vh;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: opacity 0.3s ease-in-out;
    }
  }

  & .control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    font-size: 2rem;
    opacity: 0.25;
    cursor: pointer;
    z-index: 2;
    transition: opacity 0.25s ease-in-out;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
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
        background: var(--azul-oscuro-80);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .carrusel {

    & .control {
      display: none;
    }
  }
}

/* --- Transición suave entre imágenes --- */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

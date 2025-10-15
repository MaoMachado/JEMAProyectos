<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import FloatingButtons from './components/FloatingButtons.vue';
import FooterJema from './components/FooterJema.vue';
import HeaderJema from './components/HeaderJema.vue';
import ToastGlobal from './components/ToastGlobal.vue';

const showHeader = ref(true);
const isMobile = ref(false);

function updateViewport() {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
  showHeader.value = !isMobile.value; // Desktop: true, Mobile: false
}

onMounted(() => {
  updateViewport();
  window.addEventListener("resize", updateViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateViewport);
});
</script>

<template>
  <FloatingButtons @toggleHeader="showHeader = !showHeader" />

  <transition name="fade">
    <div v-show="showHeader" class="overlay" @click="showHeader = false"></div>
  </transition>

  <transition name="slide-left">
    <HeaderJema v-show="showHeader" @close="showHeader = false" />
  </transition>

  <main>
    <ToastGlobal />
    <router-view />
  </main>

  <FooterJema />
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.overlay {
  display: none;
}

@media screen and (max-width: 768px) {
  .overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }
}

/* Animación del overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Animación de entrada/salida */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>

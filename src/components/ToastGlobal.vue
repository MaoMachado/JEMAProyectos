<script setup>
import { storeToRefs } from "pinia";
import { useToastStore } from "@/utils/toastStore";

const toastStore = useToastStore();
const { message, type, show } = storeToRefs(toastStore);
</script>

<template>
  <transition name="fade-slide">
    <div
      v-if="show"
      class="fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50"
      :class="{
        'bg-green-600': type === 'success',
        'bg-red-600': type === 'error',
        'bg-blue-600': type === 'info'
      }"
    >
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
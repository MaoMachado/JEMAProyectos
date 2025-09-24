<script setup>
const title = "Copyright © 2025 gemainmobiliaria.com"
import imgJ from "@/assets/img/J.png"
</script>

<template>
  <footer class="w-full min-h-[100px] p-4 place-content-center font-sans">
    <div class="flex items-center justify-between">
      <h2 class="text-lg text-gray-600 font-light">{{ title }}</h2>
      <img class="w-8 h-8 brightness-50" :src="imgJ" alt="Logo de JemaProyectos" loading="lazy">
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  border-top: 1px solid rgba(30, 64, 174, 0.5);

  .dark & {
    border-top: 1px solid rgba(30, 64, 174, 0.2);
  }

  & div {
    width: var(--width-1200);
    margin-inline: auto;

    & h2 {
      .dark & {
        color: #ccc;
      }
    }
  }
}
</style>

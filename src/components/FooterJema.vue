<script setup>
const title = "Copyright © 2025 gemainmobiliaria.com"
import imgJ from "@/assets/img/J.png"
</script>

<template>
  <footer>
    <div>
      <h2 class="text-lg text-gray-600 font-light">{{ title }}</h2>
      <RouterLink to="/login">
        <img class="w-8 h-8 brightness-50" :src="imgJ" alt="Logo de JemaProyectos" loading="lazy">
      </RouterLink>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  place-content: center;
  min-height: 100px;

  & div {
    display: flex;
    column-gap: 2.5rem;
    width: var(--width-1200);
    margin-inline: auto;

    & h2 {
      place-self: center;

      .dark & {
        color: #ccc;
      }
    }
  }
}
</style>

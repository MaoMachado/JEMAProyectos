<script setup>
import { toggleTheme } from "@/utils/theme";
import Jema from "@/assets/img/Jema.png"
</script>

<template>
  <header class="flex items-center">

    <a class="font-sans" href="#hero">
      <img class="w-full h-15" :src="Jema" alt="Logo de JemaProyectos" loading="lazy">
    </a>

    <section class="header-navbar flex-1 flex justify-end items-center gap-6">
      <div class="flex items-center">
        <button class="cursor-pointer" @click="toggleTheme()">
          <span class="text-4xl">🌓</span>
        </button>
        <a href="https://wa.me/573123456789" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/img/icons/facebook.svg" alt="Facebook">
        </a>
      </div>
      <nav class="header-container font-sans font-normal text-lg">
        <a href="#que-hacemos">¿Qué Hacemos?</a>
        <a href="#joyas">Joyas</a>
      </nav>
    </section>

  </header>
</template>

<style scoped lang="scss">
header {
  width: var(--width-1200);
  margin: 0 auto;
  padding-block: 1rem;
}

.header-navbar {

  & .header-container {
    display: flex;
    justify-content: end;
    gap: 1rem;
    position: relative;

    & a {
      position: relative;
      transition: all 0.2s cubic-bezier(0.23, 1, 0.320, 1);

      &:hover::before {
        content: "";
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, transparent 20%, rgba(59, 131, 246, 0.25));
        position: absolute;
        left: 0;
        bottom: -5px;
        border-radius: 1rem;
      }

      &:hover {
        color: rgb(59, 130, 246);
        transform: translateY(-2.5px);
      }
    }
  }
}
</style>

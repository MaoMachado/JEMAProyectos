<script setup>
import Jema from "@/assets/img/Jema.png"
</script>

<template>
  <header class="flex items-end justify-between">
    <h1 class="flex items-end font-sans">
      <img class="w-full h-15" :src="Jema" alt="Logo de JemaProyectos" loading="lazy">
      <span class="text-5xl font-light">Proyectos</span>
    </h1>

    <section class="header-navbar">
      <nav class="header-container">
        <a href="">Inicio</a>
        <a href="">Proyectos</a>
        <a href="">Contactémonos</a>
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
    gap: 1rem;

    & a {
      font-size: 1.3em;
      font-family: sans-serif;
      font-weight: lighter;
      transition: color 0.3s linear, transform 0.3s ease-in-out;

      &:hover {
        color: rgb(59, 130, 246);
        transform: translateY(-2.5px);
      }
    }
  }
}
</style>

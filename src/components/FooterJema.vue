<script setup>
const title = "Copyright © 2025 gemainmobiliaria.com"
import imgJ from "@/assets/img/J.png"
import SuscripcionJema from "./SuscripcionJema.vue";
</script>

<template>
  <footer>
    <div data-aos="slide-up">
      <h2 class="text-lg text-gray-600 font-light">{{ title }}</h2>
      <RouterLink to="/login">
        <img class="w-8 h-8 brightness-50" :src="imgJ" alt="Logo de JemaProyectos" loading="lazy">
      </RouterLink>
      <SuscripcionJema />
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  inline-size: 100%;
  min-block-size: 200px;
  place-content: center;
  padding-block: 2rem;

  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    width: var(--wide-1200);
    margin-inline: auto;

    & h2 {
      place-self: center;
      opacity: 0.25;

      .dark & {
        color: #ccc;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  footer {
    width: 100%;

    & div {
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      column-gap: 1rem;

      & h2 {
        text-align: center;
      }
    }
  }
}

@media screen and (max-width: 468px) {
  footer {
    padding-inline: 1rem;

    & div {
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>

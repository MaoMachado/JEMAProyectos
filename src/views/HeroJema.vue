<script setup>
import J from '@/assets/img/J.png';
</script>

<template>
  <section class="hero">
    <header class="hero-header">
      <p>Ingeniero Civil</p>
      <img :src="J" alt="Logo de JemaProyectos" loading="lazy" />
    </header>
    <article class="hero-article font-sans">
      <div>
        <p>
          En Gema Inmobiliaria nos especializamos en captar propiedades con verdadero potencial. Nuestro equipo analiza
          a fondo cada inmueble evaluando:
        </p>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.hero {
  display: grid;
  place-content: center;
  height: 80dvh;
  width: var(--width-1200);
  margin-inline: auto;
  padding-inline: 2rem;
  background: rgba(59, 131, 246, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 1rem;

  & .hero-header {
    display: flex;
    justify-content: center;

    & img {
      width: 100px;
    }

    & p {
      font-size: 4em;
      font-family: sans-serif;
      text-shadow: 0 0 20px #ccc;
    }
  }
}

.hero-article {

  & div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & p {
      font-size: 1.5em;
      font-weight: lighter;
      text-align: center;
    }
  }

}
</style>

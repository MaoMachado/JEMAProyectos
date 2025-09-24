<script setup>
import J from '@/assets/img/J.png';
</script>

<template>
  <section class="hero" id="hero">
    <header class="hero-header">
      <h2 class="font-sans">GEMA INMOBILIARIA</h2>
      <img :src="J" alt="Logo de JemaProyectos" loading="lazy" />
    </header>
    <article class="hero-article font-sans">
      <div>
        <p>
          Aquí no encuentras propiedades, encuentras joyas del mercado inmobiliario
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
  background: linear-gradient(to right, transparent 30%, rgba(59, 131, 246, 0.1) 70%, rgba(59, 131, 246, 0.5) 100%);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    width: 400px;
    height: 400px;
    background: rgba(30, 64, 175, 0.2);
    position: absolute;
    top: 15%;
    left: -15%;
    z-index: -1;
    border-radius: 50%;
    filter: blur(5px);
    box-shadow: 0 0 20px hsla(0, 0%, 80%, 0.3);
  }

  & .hero-header {
    display: flex;
    align-items: start;
    justify-content: center;

    & img {
      width: 80px;
      height: 80px;
    }

    & h2 {
      font-size: 4em;
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

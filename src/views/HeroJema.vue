<script setup>
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero-overlay">
      <header class="hero-header">
        <h1>GEMA INMOBILIARIA</h1>
      </header>

      <article class="hero-article">
        <p>
          Aquí no encuentras propiedades, encuentras joyas del mercado inmobiliario
        </p>
      </article>

      <article class="hero-joyas-enlace">
        <a href="#joyas" class="ultimas-joyas">Conoce Las Ultimas Joyas</a>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  width: 100%;
  height: 100vh;
  padding-block: 10px;
  transform: translateY(-60px);
  z-index: 5;

  & .hero-overlay {
    display: grid;
    place-content: center;
    width: var(--wide-1200);
    margin-inline: auto;
    height: 100%;
    background: linear-gradient(to right, transparent 30%, var(--azul-claro-20) 70%, transparent);
    position: relative;

    &::before {
      content: "";
      width: 600px;
      height: 600px;
      background: linear-gradient(to right, transparent 50%, rgba(59, 131, 246, 0.25) 100%);
      position: absolute;
      top: 15%;
      left: -15%;
      z-index: -5;
      border-radius: 50%;
      filter: blur(20px);
      animation: pulse 5s ease-in-out infinite;
    }
  }

  & .hero-header {
    text-align: center;

    & h1 {
      font-weight: 500;
      font-size: clamp(1em, 5vw, 4em);
      text-shadow: 0 0 20px var(--azul-oscuro-60);
      letter-spacing: 5px;
      line-height: 4rem;

      .dark & {
        text-shadow: 0 0 20px var(--azul-claro-80);
      }
    }
  }

  & .hero-article {

    & p {
      font-size: 1.85em;
      font-weight: 400;
      text-align: center;
      color: var(--color5);

      .dark & {
        color: #ccc;
      }
    }
  }

  & .hero-joyas-enlace {
    display: flex;
    justify-content: center;
    margin-top: 5rem;

    & .ultimas-joyas {
      padding: 5px 8.5px;
      cursor: pointer;
      border: 2px solid var(--azul-oscuro-80);
      border-radius: 1rem;
      background: linear-gradient(to right, transparent, var(--azul-oscuro-20));
      font-size: 1.25em;
      font-weight: 100;
      transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;

      &:hover {
        transform: translateY(-2.5px);
        box-shadow: 0 0 20px var(--azul-oscuro-20);
      }
    }

  }
}

@keyframes pulse {
  0% {
    scale: 1;
  }

  50% {
    scale: 1.1;
  }

  100% {
    scale: 1;
  }
}

@media screen and (max-width: 768px) {
  .hero {
    inline-size: 100dvw;
    height: 100dvh;
    transform: translateY(0);

    & .hero-overlay {
      display: flex;
      flex-direction: column;
      padding-inline: 0.85rem;
      background: linear-gradient(to bottom, transparent 30%, var(--azul-claro-20) 70%, transparent);

      &::before {
        width: 500px;
        height: 500px;
        transform: translateX(0);
      }
    }

    & .hero-header {

      & h1 {
        line-height: 5rem;
        letter-spacing: 2.5px;
        text-align: center;
        font-size: clamp(2.5em, 8vw, 3.5em);
        font-weight: 500;
      }
    }

    & .hero-article {
      & p {
        font-size: 1.2em;
        text-align: center;
        font-weight: 300;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .hero {

    & .hero-overlay {
      overflow: hidden;

      &::before {
        width: 300px;
        height: 300px;
        transform: translateX(-150px);
        top: 0;
      }

      &::after {
        content: "";
        width: 300px;
        height: 300px;
        background: linear-gradient(to left, rgba(59, 131, 246, 0.25) 50%, transparent 100%);
        position: absolute;
        bottom: 2.5rem;
        right: 0;
        z-index: -5;
        border-radius: 50%;
        filter: blur(20px);
        transform: translateX(200px)
      }
    }

    & .hero-header {

      & h1 {
        font-size: 2em;
        line-height: 3rem;
      }
    }
  }
}
</style>

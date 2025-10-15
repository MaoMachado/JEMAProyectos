<script setup>
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero-overlay">
      <header class="hero-header">
        <h2 class="font-sans">GEMA INMOBILIARIA</h2>
      </header>
      <article class="hero-article">
        <div>
          <p>
            Aquí no encuentras propiedades, encuentras joyas del mercado inmobiliario
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  height: 100vh;
  padding-block: 10px;
  transform: translateY(-80px);
  z-index: -5;

  & .hero-overlay {
    place-content: center;
    width: var(--wide-1200);
    margin-inline: auto;
    height: 100%;
    background: linear-gradient(to right, transparent 30%, rgba(59, 131, 246, 0.25) 100%);
    border-radius: 1rem;
    position: relative;

    &::before {
      content: "";
      width: 500px;
      height: 500px;
      background: linear-gradient(to right, transparent 50%, rgba(59, 131, 246, 0.25) 100%);
      position: absolute;
      top: 15%;
      left: -15%;
      z-index: -5;
      border-radius: 50%;
      filter: blur(15px);
      animation: pulse 5s ease-in-out infinite;
    }
  }

  & .hero-header {
    display: flex;
    align-items: start;
    justify-content: center;

    & h2 {
      font-weight: 100;
      font-size: clamp(1em, 5vw, 4em);
      text-shadow: 0 0 20px rgba(3, 13, 46, 0.5);

      .dark & {
        text-shadow: 0 0 20px #ccc;
      }
    }
  }
}

.hero-article {

  & div {

    & p {
      font-size: 1.5em;
      font-weight: 500;
      text-align: center;
      color: var(--color5);

      .dark & {
        color: #ccc;
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
    inline-size: 100%;
    height: 100dvh;
    padding: 1rem;
    transform: translateY(0);

    & .hero-overlay {
      display: flex;
      flex-direction: column;
      row-gap: 1.25rem;
      padding-inline: 0.85rem;
      background: linear-gradient(to bottom, transparent, rgba(59, 131, 246, 0.1));

      &::before {
        transform: translateX(-170px);
      }
    }

    & .hero-header {

      & h2 {
        line-height: 3rem;
        text-align: center;
        font-size: clamp(2.5em, 8vw, 4em);
        font-weight: 400;
      }
    }

    & .hero-article {

      & p {
        font-size: 1.2em;
        text-align: center;
        font-weight: 800;
      }
    }
  }
}
</style>

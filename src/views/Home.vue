<script>
import ImageCompare from '@/components/ImageCompare.vue';

export default {
  name: 'HomeView',
  components: {
    ImageCompare,
  }
}
</script>

<template>
  <header>
    <h1>JEMA PROYECTOS</h1>
    <p>Ingeniería industrial al servicio de tus ideas</p>
  </header>
  <article class="home_container">
    <section class="quien_soy">
      <h2>¿Quien Soy?</h2>
      <p>
        Soy Jeison Machado, ingeniero industrial con más de 10 años de experiencia
        diseñando soluciones eficientes para proyectos residenciales e industriales.
        Trabajo desde mi oficina en casa, combinando precisión técnica con creatividad.
      </p>
    </section>

    <section class="que_hago">
      <h2>¿Qué Hago?</h2>
      <ul>
        <li>
          <p>✏️ Diseño de bocetos y esquemas para construcciones pequeñas y medianas</p>
        </li>
        <li>
          <p>📐 Planificación de procesos industriales personalizados</p>
        </li>
        <li>
          <p>🏠 Modelos conceptuales 2D para presentación de proyectos</p>
        </li>
        <li>
          <p>📊 Optimización de procesos para empresas pequeñas</p>
        </li>
      </ul>
    </section>

    <section class="imagen_comparativa">
      <ImageCompare />
    </section>
  </article>
</template>

<style scoped>
h1,
h2 {
  font-family: var(--fuente-titulo);
  color: var(--azul-principal);
}

p {
  font-family: var(--fuente-texto);
  font-size: clamp(0.8em, 4vw, 1.2em);
  color: var(--gris-oscuro);
}

header {
  text-align: center;
  margin-block-end: 2.5rem;

  &>h1 {
    font-size: clamp(1.5em, 8vw, 3em);
  }

  &>p {
    opacity: 0.5;
  }
}

.home_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  inline-size: clamp(300px, 100vw, 1000px);
  margin-inline: auto;
  padding: 1rem;
  border-radius: 0.2rem;
  background: var(--azul-suave-50);
  overflow-y: scroll;
  block-size: 75dvh;

  & .quien_soy {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    &>h2 {
      font-size: clamp(1.2em, 5vw, 2em);
      text-align: center;
      color: var(--azul-principal);
    }

    &>p {
      width: 70%;
      text-align: justify;
      font-size: clamp(0.8em, 4vw, 1.2em);
    }
  }

  &>.que_hago {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &>h2 {
      text-align: center;
      font-size: clamp(1.2em, 5vw, 2em);
    }

    &>ul {
      list-style: none;
    }
  }
}
</style>
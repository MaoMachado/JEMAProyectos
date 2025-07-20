<script>
import ImageCompare from '@/components/ImageCompare.vue';
import antes from '@/assets/img/imgComparacion/antes.webp';
import despues from '@/assets/img/imgComparacion/despues.webp';

export default {
  name: 'HomeView',

  components: {
    ImageCompare,
  },

  data() {
    return {
      antes,
      despues
    }
  },

  mounted() {
    document.title = 'JEMA Ingeniería Industrial | Diseño y Optimización de Proyectos';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'JEMA Proyectos - Ingeniería industrial especializada en diseño de construcciones, planificación de procesos y optimización empresarial. Más de 10 años de experiencia.'
    )
  },

  beforeUnmount() {
    document.title = 'JEMA - Joyas Personalizadas y Únicas | Diseño Artesanal';
  }
}
</script>

<template>
  <main class="inicio_container" role="main" aria-labelledby="inicio-title">
    <header class="header_inicio" aria-labelledby="inicio-title">
      <h1 id="inicio-title">JEMA PROYECTOS</h1>
      <p>Ingeniería industrial al servicio de tus ideas</p>
    </header>

    <section class="home_container">
      <section class="quien_soy" aria-labelledby="quien-soy-title">
        <h2 id="quien-soy-title">¿Quién Soy?</h2>
        <p>
          Soy <strong>Jeison Machado</strong>, ingeniero industrial con más de <strong>10 años de experiencia</strong>
          diseñando soluciones eficientes para proyectos residenciales e industriales.
          Trabajo desde mi oficina en casa, combinando precisión técnica con creatividad.
        </p>
      </section>

      <section class="que_hago" aria-labelledby="que-hago-title">
        <h2 id="que-hago-title">¿Qué Hago?</h2>
        <ul role="list">
          <li>
            <p><span aria-label="Lápiz">✏️</span> Diseño de bocetos y esquemas para construcciones pequeñas y medianas
            </p>
          </li>
          <li>
            <p><span aria-label="Escuadra">📐</span> Planificación de procesos industriales personalizados</p>
          </li>
          <li>
            <p><span aria-label="Casa">🏠</span> Modelos conceptuales 2D para presentación de proyectos</p>
          </li>
          <li>
            <p><span aria-label="Gráfico">📊</span> Optimización de procesos para empresas pequeñas</p>
          </li>
        </ul>
      </section>

      <section class="imagen_comparativa" aria-label="Comparación de diseño antes y después">
        <ImageCompare :before-image="antes" :after-image="despues" before-label="Diseño Inicial"
          after-label="Resultado Final" :initial-position="60" />
      </section>
    </section>
  </main>
</template>

<style scoped>
.inicio_container {
  display: flex;
  row-gap: 2rem;
  flex-direction: column;
  inline-size: clamp(300px, 100vw, 100%);
  padding: 1rem;
  position: relative;
  animation: fadeIn 0.5s linear;

  &>.header_inicio {
    text-align: center;

    &>h1 {
      font-size: clamp(1.5em, 8vw, 3em);
    }

    &>p {
      opacity: 0.6;
      font-size: 1.1em;
    }
  }

  &>.home_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    & .quien_soy {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      &>h2 {
        font-size: clamp(1.2em, 5vw, 2.25em);
        text-align: center;
        color: var(--azul-principal);
      }

      &>p {
        width: 70%;
        text-align: justify;
        text-wrap: balance;
        font-size: clamp(0.8em, 4vw, 1.4em);
        font-weight: 300;
      }
    }

    &>.que_hago {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &>h2 {
        text-align: center;
        font-size: clamp(1.2em, 5vw, 2.25em);
      }

      &>ul {
        list-style: none;

        &>li {
          &>p {
            font-size: 1.5em;
            font-weight: 300;
          }
        }
      }
    }

    &>.imagen_comparativa {
      width: 90%;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media screen and (max-width: 767px) {
  .inicio_container {
    gap: 1rem;
    min-height: 100dvh;
    padding: 0.5rem;

    .header_inicio {
      display: none;
      margin-top: 1rem;
      background: var(--azul-suave-50);
      padding: 0.5rem;
      box-shadow: inset 0 0 5px var(--azul-claro-50);
      border-radius: 0.5rem;

      h1 {
        margin: 0;
        font-size: 2.5em;
      }

      p {
        margin: 0;
      }
    }

    .home_container {
      width: 100%;

      .quien_soy {
        width: 100%;
        gap: 1rem;
        padding: 0.5rem;

        h2 {
          margin: 0;
          width: inherit;
          font-size: 2.25em;
        }

        p {
          margin: 0;
          width: inherit;
          font-size: 1.25em;
        }
      }

      .que_hago {
        background: var(--azul-suave-50);
        padding: 0.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);

        &>h2 {
          margin: 0;
          font-size: 2.25em;
        }

        ul {
          text-align: center;

          &>li {

            p {
              font-size: 1.25em;
            }
          }
        }
      }

      .imagen_comparativa {
        width: 100%;
      }
    }
  }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .inicio_container {
    animation: none;
    animation: fadeIn 0.5s linear;
  }
}

/* Mejoras de contraste y legibilidad */
.quien_soy p {
  line-height: 1.6;
  color: var(--azul-oscuro, #333);
}

.que_hago ul li p {
  line-height: 1.5;
  margin: 0.5rem 0;
}

/* Mejoras de hover para mejor UX */
.que_hago ul li {
  transition: transform 0.2s ease;
}

.que_hago ul li:hover {
  transform: translateX(5px);
}
</style>

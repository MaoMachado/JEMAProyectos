<script>
import Joya from '@/assets/img/joya.png'
import CardProducto from '@/components/CardProducto.vue';

//Imagenes
import img1 from '@/assets/img/fotosFloresta/img_1.jpg';
import img2 from '@/assets/img/fotosFloresta/img_2.jpg';
import img3 from '@/assets/img/fotosFloresta/img_3.jpg';
import img4 from '@/assets/img/fotosFloresta/img_4.jpg';
import img5 from '@/assets/img/fotosFloresta/img_5.jpg';

//Libros
import pdf1 from '@/assets/contenidoDigital/pdf_1.png'
import pdf2 from '@/assets/contenidoDigital/pdf_2.png'

export default {
  name: 'JoyasJemaView',

  data() {
    return {
      titulo: 'NUESTRAS JOYAS',
      Joya,
      imagenPrincipal: img1,
      galeria: [img1, img2, img3, img4, img5],
      pdfsImg: [pdf1, pdf2],
      numCell: 3169274523
    }
  },

  components: {
    CardProducto
  },

  mounted() {
    document.title = 'JEMA - Joyas Únicas y Exclusivas | Venta de Joyas';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'JEMA - Joyas únicas y exclusivas. Descubre nuestra colección de joyas especiales. Venta de joyas únicas.');
  },

  beforeUnmount() {
    document.title = 'JEMA - Joyas Personalizadas y Únicas | Diseño Artesanal';
  }
}
</script>

<template>
  <main class="joyas_container" role="main" aria-labelledby="titulo-header-title">
    <header class="header_joyas_container" aria-labelledby="joyas-header-title">
      <h1 class="titulo-header-joyas" id="joyas-header-title">
        {{ titulo }}
        <img :src="Joya" alt="Joyas únicas JEMA" loading="lazy" />
      </h1>
      <p>
        Descubre joyas únicas y exclusivas que se adaptan a tu estilo personal.
        Cada pieza es cuidadosamente seleccionada para ofrecerte la mejor calidad y diseño.
      </p>
      <p>
        Nuestras joyas te están esperando. Encuentra piezas que reflejen tu personalidad y elegancia.
      </p>
    </header>

    <section class="joyas-ventas-contenido" aria-labelledby="joyas-ventas-title">
      <h2 class="titulo_joyas" id="joyas-ventas-title">Joyas Jema</h2>
      <CardProducto titulo="Floresta" descripcion="Casa ubicada en el barrio La Floresta - Venta de joyas únicas"
        :imagen="imagenPrincipal" :galeria="galeria" :numeroContacto="numCell" />
    </section>
  </main>
</template>

<style scoped>
.joyas_container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  inline-size: clamp(300px, 100vw, 100%);
  padding: 1rem;
  position: relative;
  animation: fadeIn 0.5s ease-in-out;

  &::before {
    content: '';
    position: fixed;
    bottom: 5px;
    right: 20px;
    width: 200px;
    height: 200px;
    background: url('../assets/background/shooping.svg');
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.1;
    pointer-events: none;
    z-index: 1;
  }

  .header_joyas_container {
    display: flex;
    flex-direction: column;
    inline-size: 80%;
    margin-inline: auto;

    &>.titulo-header-joyas {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 0.5rem;
      font-size: clamp(1.3em, 8vw, 3em);

      &:hover {
        transform: scale(1.02);
        transition: transform 0.2s ease;
      }

      &>img {
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
    }

    p {
      font-size: 1.3em;
      font-weight: 300;
      text-align: justify;
    }
  }

  .joyas-ventas-contenido {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    inline-size: clamp(300px, 100vw, 95%);
    margin-inline: auto;
    padding: 1rem;
    background: var(--azul-suave);
    border-radius: 0.5rem;
    box-shadow: var(--shadow-xl);

    &>.titulo_joyas {
      width: 100%;
      text-align: center;
      font-size: 2.5em;
      color: var(--azul-oscuro, #1e4971);
      margin-bottom: 1rem;
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
  .joyas_container {
    padding: 0.25rem;
    animation: fadeIn 0.5s ease-in-out;

    &::before {
      display: none;
    }

    &>.header_joyas_container {
      row-gap: 1rem;
      width: 100%;
      margin-top: 0.5rem;
      padding: 0.5rem;

      &>.titulo-header-joyas {
        flex-direction: column;
        font-size: 2em;
        margin: 0;
      }

      &>p {
        font-size: 1.2em;
        margin: 0;
      }
    }

    &>.joyas-ventas-contenido {
      width: 95vw;
      padding: 0.25rem;
      box-shadow: var(--shadow-xl);

      &>.titulo_joyas {
        font-size: 2.2em;
        margin: 0;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .joyas_container {
    animation: none;
  }
}
</style>

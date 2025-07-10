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
  }
}
</script>

<template>
  <section class="joyas_container">
    <header class="header_joyas_container">
      <h1>{{ titulo }} <img :src="Joya" alt="Joya" /></h1>
      <p>Descubre productos únicos diseñados para complementar tus proyectos y tu crecimiento personal.</p>
    </header>

    <section class="joyas_container">
      <h2 class="titulo_joyas">Viviendas Jema</h2>
      <CardProducto titulo="Floresta" descripcion="Casa Ubicada en el barrio floresta" :imagen="imagenPrincipal"
        :galeria="galeria" :numeroContacto="numCell" />
    </section>

    <section class="joyas_container">
      <h2 class="titulo_joyas">Contenido Digital JEMA</h2>
      <CardProducto titulo="Libro PDF" :imagen="pdfsImg[0]" :numeroContacto="numCell" />
    </section>
  </section>
</template>

<style scoped>
.joyas_container {
  display: flex;
  flex-direction: column;
  gap: 2rem;

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

  header {
    display: flex;
    flex-direction: column;
    text-align: center;

    &>h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: clamp(1.5em, 8vw, 3em);


      &>img {
        inline-size: 100px;
      }
    }
  }

  .joyas_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    inline-size: clamp(300px, 100vw, 100%);
    margin-inline: auto;
    padding: 1rem;

    &>.titulo_joyas {
      width: 100%;
      text-align: center;
      font-size: clamp(1.2em, 5vw, 2em);
    }
  }
}

@media screen and (max-width: 767px){
  .joyas_container{

    &::before{
      display: none;
    }

    & > .header_joyas_container{
      margin-top: 0.5rem;
      background: var(--azul-suave-50);
      padding: 0.5rem;

      & > h1{
        /* flex-direction: column; */
        gap: 0;
        font-size: 2.1em;
        margin: 0;
      }
      & > p{
        font-size: 1.2em;
        margin: 0;
      }
    }

    & > .joyas_container{
      padding: 0.5rem;

      & >.titulo_joyas{
        font-size: 2.2em;
        margin: 0;
      }
    }
  }
}
</style>

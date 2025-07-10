<script>
import SellJoya from '@/assets/img/sell_joya.png'

export default {
  name: 'CardProducto',

  data() {
    return {
      mostrarGaleria: false,
      SellJoya
    }
  },

  props: {
    titulo: String,
    imagen: String,
    galeria: {
      type: Array,
      default: () => [],
    },

    numeroContacto: {
      type: String,
      default: '3165124487',
    },

    descripcion: {
      type: String,
      default: ''
    }
  },

  methods: {
    cerrarGaleria() {
      this.mostrarGaleria = false
    },

    contactar() {
      const whatsappURL = `https://wa.me/57${this.numeroContacto}?text=Hola%20estoy%20interesado%20en%20${encodeURIComponent(this.titulo)}`
      window.open(whatsappURL, '_blank')
    }
  }
}
</script>

<template>
  <section class="card_producto">
    <h2 class="titulo">{{ titulo }}
      <img class="icono_sell" :src="SellJoya" alt="Icono de sell">
    </h2>
    <img :src="imagen" :alt="titulo" class="imagen_principal">
    <p v-if="descripcion" class="descripcion">
      {{ descripcion }}
    </p>

    <div class="botones">
      <button v-if="galeria.length > 0" @click="mostrarGaleria = true" class="btn">Ver Galería</button>
      <button @click="contactar" class="btn btn_secundario">Contactar</button>
    </div>

    <!-- Modal Galeria -->
    <div v-if="mostrarGaleria && galeria.length > 0" class="modal_overlay" @click.self="cerrarGaleria">
      <section class="modal_contenido">
        <h3>Galería de {{ titulo }}</h3>

        <article class="galeria">
          <img v-for="(img, index) in galeria" :key="index" :src="img" alt="Vista Galeria" class="img_miniatura">
        </article>

        <button @click="cerrarGaleria" class="btn btn_cerrar">Cerrar</button>
      </section>
    </div>
  </section>
</template>

<style scoped>
.card_producto {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: var(--blanco);

  &:hover > .titulo > .icono_sell{
    filter: grayscale(0);
    scale: 1.15;
  }

  &:hover > .imagen_principal{
    transform: translateY(-5px) scale(1.05);
  }

  &>.imagen_principal {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0.8rem;
    transition: transform 0.2s ease;
  }

  &>.titulo {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: fit-content;
    margin: 0;
    font-size: 1.5em;

    & > .icono_sell{
      width: 70px;
      height: 70px;
      filter: grayscale(100%);
      transition: all 0.2s ease;
    }
  }

  &>.botones {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;

    &>.btn {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--naranja);
      color: var(--blanco);
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1em;
      font-weight: 600;
      font-family: var(--fuente-titulo);
      transition: all 0.2s;

      &:hover {
        transform: translateY(-2px);
        opacity: 0.9;
      }
    }

    &>.btn_secundario {
      background: var(--verde);
    }
  }

  &>.modal_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    place-content: center;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    z-index: 100;

    &>.modal_contenido {
      inline-size: clamp(300px, 100%, 1000px);
      max-block-size: 100%;
      margin-inline: auto;
      overflow-y: auto;
      padding: 2rem;
      background: var(--blanco);
      border-radius: 0.5rem;
      text-align: center;

      & > h3{
        font-size: 2em;
      }

      &>.galeria {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;

        &>.img_miniatura {
          width: 300px;
          height: 150px;
          object-fit: cover;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

          &:hover{
            scale: 1.1;
          }
        }
      }

      &>.btn_cerrar {
        margin-top: 1rem;
        background: var(--azul-principal);
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .card_producto {
    inline-size: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: none;
    background: var(--azul-suave);

    &:hover {
      background: var(--azul-claro-50);
      transition: backgraund 0.2s ease-in-out;
    }

    &>.titulo {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      font-size: 2em;
      margin: 0;

      &>.icono_sell {
        width: 60px;
        height: 60px;
        filter: grayscale(100%);
        transition: transform 0.3s linear, filter 0.3s linear;
      }
    }

    &:hover>.titulo>.icono_sell {
      transform: scale(1.3);
      filter: grayscale(0);
    }

    &>.descripcion {
      margin: 0;
      font-size: 1.2em;
    }

    &>.modal_overlay {
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);

      &>.modal_contenido {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0.5rem;
        background: transparent;

        &>h3 {
          margin: 0;
          font-size: 2em;
          color: var(--blanco);
        }

        &>.galeria {
          width: 100%;

          &>.img_miniatura {
            width: 100%;
            height: 200px;

          }
        }
      }
    }
  }
}
</style>

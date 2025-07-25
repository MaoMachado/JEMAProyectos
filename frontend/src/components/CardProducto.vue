<script>
import SellJoya from '@/assets/img/sell_joya.png'

export default {
  name: 'CardProducto',

  data() {
    return {
      mostrarGaleria: false,
      indiceActual: 0,
      SellJoya,
      direccionTransicion: 'fade-slide-next'
    }
  },

  props: {
    titulo: String,
    descripcion: String,
    portada: String,
    galeria: Array
  },

  methods: {
    siguienteImagen() {
      this.direccionTransicion = 'fade-slide-next';
      this.indiceActual = (this.indiceActual + 1) % this.galeria.length;
    },

    anteriorImagen() {
      this.direccionTransicion = 'fade-slide-prev';
      this.indiceActual = (this.indiceActual - 1 + this.galeria.length) % this.galeria.length;
    },

    cerrarGaleria() {
      this.mostrarGaleria = false
    },

    contactar() {
      if (!this.numeroContacto || typeof this.numeroContacto !== "string") {
        console.error("Numero de contacto inválido");
        return;
      }

      let numeroLimpio = this.numeroContacto.replace(/\D/g, "");

      numeroLimpio = numeroLimpio.replace(/^0+/, "");

      if (!numeroLimpio.startsWith("57")) {
        numeroLimpio = "57" + numeroLimpio;
      }

      console.log(numeroLimpio)

      const mensaje = `Hola, estoy interesado en ${this.titulo}`;
      const whatsappURL = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
      window.open(whatsappURL, "_blank");
    },

    handleKeyDown(e) {
      if (this.mostrarGaleria && e.key === 'Escape') {
        this.cerrarGaleria();
      }
    }
  },

  watch: {
    mostrarGaleria(val) {
      document.body.style.overflow = val ? 'hidden' : '';

      if (val) {
        this.$nextTick(() => {
          this.$refs.btnCerrarGaleria?.focus();
        })
      }
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = '';
  },
}
</script>

<template>
  <section class="card_producto">
    <h3 class="titulo">
      {{ titulo }}
      <img class="icono_sell" :src="SellJoya" alt="Icono de sell" loading="lazy">
    </h3>
    <img :src="portada" :alt="`Imagen principal de ${titulo}`" class=" imagen_principal" loading="lazy" />
    <p v-if="descripcion" class="descripcion">
      {{ descripcion }}
    </p>

    <div class="botones">
      <button type="button" v-if="galeria.length > 0" @click="mostrarGaleria = true" class="btn"
        aria-label="Ver galeria de {{ titulo }}">Ver Galería</button>
      <button type="button" @click="contactar" class="btn btn_secundario"
        aria-label="Contacto por whatsapp sobre {{ titulo }}">Contactar</button>
    </div>

    <!-- Modal Galeria -->
    <transition name="fade-modal">
      <div v-if="mostrarGaleria && galeria.length > 0" class="modal_overlay" @click.self="cerrarGaleria" role="dialog"
        aria-modal="true" aria-labelledby="galeria-titulo">
        <section class="modal_contenido">
          <h4 id="galeria-titulo">Galería de {{ titulo }}</h4>

          <article class="galeria-carrusel">
            <button class="btn" @click.stop="anteriorImagen">⟨</button>

            <div class="carrusel-imagen-wrapper">
              <transition :name="direccionTransicion">
                <img v-if="galeria.length" :src="galeria[indiceActual]" :key="indiceActual"
                  :alt="`Imagen ${indiceActual + 1} de ${titulo}`" class="img-carrusel" loading="lazy" />
              </transition>
            </div>

            <button class="btn" @click.stop="siguienteImagen">⟩</button>
          </article>

          <button type="button" @click="cerrarGaleria" class="btn btn_cerrar"
            aria-label="Botón para cerrar la galeria de fotos" ref="btnCerrarGaleria">Cerrar</button>
        </section>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.card_producto {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 300px;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: var(--blanco);

  &:hover>.titulo>.icono_sell {
    filter: grayscale(0);
    scale: 1.15;
  }

  &:hover>.imagen_principal {
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

    &>.icono_sell {
      width: 70px;
      height: 30px;
      object-fit: cover;
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
}

.modal_overlay {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border: 2px solid #0000008c;
  border-radius: 10px;
  overflow: auto;
  z-index: 1;
}

.modal_contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.modal_contenido h4 {
  margin: 0;
  color: var(--blanco);
  font-size: 2em;
}

.galeria-carrusel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.carrusel-imagen-wrapper {
  position: relative;
  width: 600px;
  height: 80vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.galeria-carrusel .img-carrusel {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
}

.galeria-carrusel .btn {
  padding: 10px;
  background: var(--azul-suave);
  border: 1px solid var(--azul-oscuro-50);
  border-radius: var(--radius-md);
  font-weight: bold;
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}

.galeria-carrusel .btn:active {
  transform: translateY(-2px);
  box-shadow: 0 0 15px hsla(0, 0%, 96%, 0.5);
}

.modal_contenido .btn_cerrar {
  padding: var(--spacing-xs);
  border: 1px solid var(--azul-oscuro-50);
  border-radius: var(--radius-md);
  font-size: 1em;
  font-family: var(--fuente-titulo);
  font-weight: bold;
}

.modal_contenido .btn_cerrar:hover {
  background: var(--azul-principal);
  color: var(--blanco);
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
      transition: background 0.2s ease-in-out;
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

/* Animaciones */
.fade-slide-next-enter-active,
.fade-slide-next-leave-active,
.fade-slide-prev-enter-active,
.fade-slide-prev-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-next-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.fade-slide-next-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s cubic-bezier(.4, 0, .2, 1), transform 0.3s cubic-bezier(.4, 0, .2, 1);
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-modal-enter-to,
.fade-modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>

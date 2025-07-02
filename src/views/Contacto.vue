<script>
import JIcon from '@/assets/img/J.png';
import EnvioCorreoIcon from '@/assets/img/enviar_correo.png';
import facebookIcon from '@/assets/img/facebook_icon.png';
import instagramIcon from '@/assets/img/instagram_icon.png';
import whatsappIcon from '@/assets/img/whatsapp_icon.png';

export default {
  name: 'ContactoView',
  data() {
    return {
      JIcon,
      EnvioCorreoIcon,
      facebookIcon,
      instagramIcon,
      whatsappIcon,
      enviado: false,
      nombre: '',
      email: '',
      mensaje: '',
      error: {}
    }
  },
  methods: {
    validarFormulario() {
      this.error = {};

      if (!this.nombre || !this.email || !this.mensaje) {
        this.error.nombre = 'El nombre es obligatorio';
        this.error.email = 'El Correo es obligatorio';
        this.error.mensaje = 'El mensaje es obligatorio';
      } else if (this.nombre.length < 3 || this.mensaje.length < 3) {
        this.error.nombre = 'El nombre debe tener minimo 3 caracteres';
        this.error.mensaje = 'El mensaje debe tener minimo 3 caracteres';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.error.email = 'El email no es válido'
      }

      return Object.keys(this.error).length === 0;
    },

    onSubmit(e) {
      if (!this.validarFormulario()) {
        e.preventDefault();
      } else {
        this.enviado = true;
      }
    },

    cerrarDialogo() {
      this.enviado = false;
    }
  }
}
</script>

<template>
  <section class="contacto_container">
    <h1 class="titulo_contacto">Contactame <img :src="JIcon" alt="Icono De J Jema"> EMA</h1>

    <p class="intro_contacto">
      ¿Quieres saber más sobre nuestros servicios o tienes una idea que quieres hacer realidad? <br />
      Escríbeme y con gusto te responderé personalmente.
    </p>

    <form @submit="onSubmit" action="https://formsubmit.co/machado-mario@outlook.com" method="post"
      class="form_content">
      <fieldset class="form_container">
        <legend class="form_legend">Formulario Envio Correo</legend>

        <div class="input_content form_nombre">
          <input type="text" name="nombre" id="nombre" v-model="nombre" />
          <label for="nombre">Nombre Y Apellido</label>
          <div v-if="error.nombre" class="error">
            <p>{{ error.nombre }}</p>
          </div>
        </div>

        <div class="input_content form_email">
          <input type="email" name="email" id="email" v-model="email" />
          <label for="email">Email</label>
          <div v-if="error.email" class="error">
            <p>{{ error.email }}</p>
          </div>
        </div>

        <div class="input_content form_mensaje">
          <textarea name="mensaje" id="mensaje" rows="5" v-model="mensaje"></textarea>
          <label for="mensaje">Tu Mensaje</label>
          <div v-if="error.mensaje" class="error">
            <p>{{ error.mensaje }}</p>
          </div>

        </div>

        <button :disabled="enviado" type="submit" class="form_button">
          <span>Enviar</span>
          <img :src="EnvioCorreoIcon" alt="Icono de enviar correo">
        </button>
      </fieldset>

      <div v-if="enviado" class="modal_overlay" @click.self="cerrarDialogo">
        <section class="modal_exito">
          <div class="check_container">
            <svg class="check_icon" viewBox="0 0 52 52">
              <circle class="check_circle" cx="26" cy="26" r="25" fill="none" />
              <path class="check_path" fill="none" d="M14 27l7 7 16-16" />
            </svg>
          </div>
          <h2>¡Mensaje Enviado!</h2>
          <p>Gracias por contactarme, te respondere pronto.</p>
          <button class="btn_cerrar" @click="cerrarDialogo">Cerrar</button>
        </section>
      </div>
    </form>

    <article class="redes_container">
      <h2>O siguenos en nuestras redes sociales</h2>
      <section class="iconos_redes">
        <a href="#"><img :src="whatsappIcon" alt="Icono de whatsapp"></a>
        <a href="#"><img :src="facebookIcon" alt="Icono de facebook"></a>
        <a href="#"><img :src="instagramIcon" alt="Icono de instagram"></a>
      </section>
    </article>
  </section>
</template>

<style scoped>
.contacto_container {
  display: flex;
  gap: 2rem;
  flex-direction: column;
  inline-size: clamp(300px, 100vw, 100%);
  padding: 1rem;
  position: relative;
  /* background: url('../assets/background/fondo_contacto.svg') center / cover no-repeat fixed; */

  &::before {
    content: '';
    position: fixed;
    bottom: 5px;
    right: 20px;
    width: 200px;
    height: 200px;
    background: url('../assets/background/concat.svg');
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.5;
    pointer-events: none;
    z-index: 1;
  }

  &>.titulo_contacto {
    display: flex;
    justify-content: center;
    font-size: clamp(1.5em, 8vw, 3em);


    &>img {
      width: 50px;
      margin-inline-start: 1rem;
    }
  }

  &>.intro_contacto {
    text-align: center;
    font-size: 1.1em;
    color: var(--azul-oscuro);
    line-height: 1.6;
  }

  &>.form_content {
    inline-size: clamp(300px, 100dvw, 50%);
    background: var(--blanco);
    margin-inline: auto;
    padding: 0.5rem;

    &>.form_container {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.3rem;
      border-color: var(--azul-suave);

      &:hover {
        border-color: var(--azul-oscuro);
        background: var(--azul-suave);
      }

      &>.form_legend {
        margin-inline-start: 1rem;
        padding: 0.1rem 0.5rem;
        background: var(--azul-suave-50);
        font-family: var(--fuente-titulo);
        border-radius: 0.5rem;
      }

      &>.input_content {
        position: relative;
        width: 100%;

        &>label {
          position: absolute;
          right: 15px;
          top: 5px;
          opacity: 0.5;
          font-family: var(--fuente-texto);
        }

        &>input,
        &>textarea {
          width: 100%;
          padding: 0.5rem;
          border: none;
          border-inline-end: 5px solid var(--azul-oscuro);
          border-radius: 0.5rem 0 0 0.5rem;

          &:focus {
            outline: 1px solid var(--azul-oscuro);
            border: none;
          }
        }

        &>input:focus+label,
        &>textarea:focus+label {
          opacity: 1;
        }

        &>.error {
          width: fit-content;
          margin-inline: auto;
          padding-inline: 0.5rem;
          background: var(--amarillo-suave-50);
          border-radius: 0.5rem;

          &>p {
            color: var(--azul-oscuro);
          }
        }
      }

      &>.form_button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--azul-principal);
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: var(--azul-oscuro);
          transform: translateY(-2px);

        }

        &:active {
          transform: scale(0.98);
        }

        &>span {
          font-family: var(--fuente-titulo);
          font-size: 1.1em;
          color: var(--blanco);
        }

        &>img {
          width: 30px;
        }
      }
    }


  }

  &>.modal_overlay {
    position: fixed;
    inset: 0;
    display: grid;
    place-content: center;
    z-index: 200;

    &>.modal_exito {
      background: var(--blanco);
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      max-inline-size: 400px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2s);

      &>.check_container {
        display: flex;
        justify-content: center;
        margin-block-end: 1rem;

        &>.check_icon {
          width: 72px;
          height: 72px;
          stroke: var(--verde);
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: stroke 0.5s ease-in-out forwards;
        }

        &>.check_circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: dash 0.6s ease-in-out forwards;
        }

        &>.check_path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: dash-check 0.4s 0.6s ease-in-out forwards;
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

  &>.redes_container {
    margin-inline: auto;

    &>h2 {
      font-size: 1.5em;
      opacity: 0.8;
    }

    &>.iconos_redes {
      display: flex;
      justify-content: center;
      gap: 1rem;

      &>a {

        &>img {
          width: 50px;
          object-fit: cover;
          filter: grayscale(100%);

          &:hover {
            filter: grayscale(0);
          }
        }
      }
    }
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes dash-check {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>

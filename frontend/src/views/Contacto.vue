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
      enviando: false,
      nombre: '',
      email: '',
      mensaje: '',
      error: {},
      whatsappNumber: '573169274523',
      whatasppMessage: 'Hola, me gustaria tener mas info',
      urlFacebook: "https://www.facebook.com/profile.php?id=61554872667407&rdid=QOlhmLX6wjcJ65CM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15ysM2BARH%2F",
    }
  },

  methods: {
    validarFormulario() {
      this.error = {};

      if (!this.nombre.trim()) {
        this.error.nombre = 'El nombre es obligatorio';
      } else if (this.nombre.this().length < 3) {
        this.error.nombre = 'El nombre debe tener mínimo 3 caracteres';
      } else if (this.nombre.trim().length > 50) {
        this.error.nombre = 'El nombre no puede exceder 50 caracteres';
      };

      if (!this.email.trim()) {
        this.error.email = 'El email es obligatorio';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email.trim())) {
          this.error.email = 'El email no es válido';
        }
      };

      if (!this.mensaje.trim()) {
        this.error.mensaje = 'El mensaje es obligatorio';
      } else if (this.mensaje.trim().length < 10) {
        this.error.mensaje = 'El mensaje debe tener mínimo 10 caracteres';
      } else if (this.mensaje.trim().length > 500) {
        this.error.mensaje = 'El mensaje no puede exceder 500 caracteres';
      };

      return Object.keys(this.error).length === 0;
    },

    validarNombre() {
      if (this.nombre.trim().length > 0 && this.nombre.trim().length < 3) {
        this.error.nombre = 'El nombre debe tener mínimo 3 caracteres';
      } else {
        delete this.error.nombre;
      }
    },

    validarEmail() {
      if (this.email.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email.trim())) {
          this.error.email = 'El email no es válido';
        } else {
          delete this.error.email;
        }
      }
    },

    validarMensaje() {
      if (this.mensaje.trim().length > 0 && this.mensaje.trim().length < 10) {
        this.error.mensaje = 'El mensaje debe tener mínimo 10 caracteres';
      } else {
        delete this.error.mensaje;
      }
    },

    async onSubmit(e) {
      if (!this.validarFormulario()) {
        e.preventDefault();
        return;
      }

      this.enviando = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.enviado = true;
        this.enviando = false;

        // Limpiar formulario
        this.nombre = '';
        this.email = '';
        this.mensaje = '';
        this.error = {};
      } catch (error) {
        console.error('Error al enviar:', error);
        this.enviando = false;
      }
    },

    cerrarDialogo() {
      this.enviado = false;
    }
  },

  mounted() {
    document.title = 'JEMA - Contacto | Joyas Únicas y Exclusivas';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'Contacta con JEMA para joyas únicas y exclusivas. Formulario de contacto directo y redes sociales.');
  },

  beforeUnmount() {
    document.title = 'JEMA - Joyas Personalizadas y Únicas | Diseño Artesanal';
  }
}
</script>

<template>
  <main class="contacto_container" role="main" aria-labelledby="titulo_contacto">
    <header class="header-contacto" aria-labelledby="titulo_contacto">
      <h1 class="titulo_contacto" id="titulo-contacto">CONTACTAME<img :src="JIcon"
          alt="Icono De J Jema"><span>EMA</span></h1>

      <p class="intro_contacto">
        ¿Quieres saber más sobre nuestros servicios o tienes una idea que quieres hacer realidad? <br />
        Escríbeme y con gusto te responderé personalmente.
      </p>
    </header>

    <form @submit="onSubmit" action="https://formsubmit.co/jdmachadoa@gmail.com" method="post" class="form_content"
      role="form" aria-labelledby="form-legend">
      <fieldset class="form_container">
        <legend class="form_legend" id="form-legend">Formulario De Contacto</legend>

        <div class="input_content form_nombre">
          <input type="text" name="nombre" id="nombre" v-model="nombre" @blur="validarNombre" aria-required="true"
            aria-describedby="nombre-error" />
          <label for="nombre">Nombre Y Apellido</label>
          <div v-if="error.nombre" class="error">
            <p>{{ error.nombre }}</p>
          </div>
        </div>

        <div class="input_content form_email">
          <input type="email" name="email" id="email" v-model="email" @blur="validarEmail" aria-required="true"
            aria-describedby="email-error" />
          <label for="email">Email</label>
          <div v-if="error.email" class="error">
            <p>{{ error.email }}</p>
          </div>
        </div>

        <div class="input_content form_mensaje">
          <textarea name="mensaje" id="mensaje" rows="5" v-model="mensaje" @blur="validarMensaje" aria-required="true"
            aria-describedby="mensaje-error"></textarea>
          <label for="mensaje">Tu Mensaje</label>
          <div v-if="error.mensaje" class="error">
            <p>{{ error.mensaje }}</p>
          </div>

        </div>

        <button :disabled="enviado || enviando" type="submit" class="form_button" :aria-busy="enviado">
          <span v-if="!enviando">Enviar</span>
          <span v-else>Enviando...</span>
          <img v-if="!enviando" :src="EnvioCorreoIcon" alt="Icono de enviar correo">
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

      <section class="redes_container" aria-labelledby="redes-container" role="dialog" aria-modal="true">
        <h3>También puedes seguirme en redes sociales</h3>
        <div class="iconos_redes">
          <a :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatasppMessage)}`" target="_blank"
            rel="noopener noreferer"><img :src="whatsappIcon" alt="Icono de whatsapp" loading="lazy" /></a>
          <a :href="urlFacebook" target="_blank" rel="noopener noreferer"><img :src="facebookIcon"
              alt="Icono de facebook" loading="lazy" /></a>
          <a href="#" target="_blank" rel="noopener noreferer"><img :src="instagramIcon" alt="Icono de instagram"
              loading="lazy" /></a>
        </div>
      </section>
    </form>
  </main>
</template>

<style scoped>
.contacto_container {
  display: flex;
  gap: 2rem;
  flex-direction: column;
  inline-size: clamp(300px, 100vw, 100%);
  padding: 1rem;
  position: relative;
  animation: fadeIn 0.5s ease-in-out;
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

  &>.header-contacto {
    &>.titulo_contacto {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: clamp(1.5em, 8vw, 3em);


      &>img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }

    &>.intro_contacto {
      text-align: center;
      font-size: 1.5em;
      font-weight: 300;
      color: var(--azul-oscuro);
    }
  }

  &>.form_content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 1rem;
    align-items: center;
    inline-size: 90%;
    background: var(--blanco);
    margin-inline: auto;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-xl);

    &>.form_container {
      flex-basis: 500px;
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.25rem;
      border-color: var(--azul-suave);

      &:hover {
        border-color: var(--azul-oscuro);
      }

      &>.form_legend {
        margin-inline-start: 1rem;
        padding: 0.25rem 0.5rem;
        background: var(--azul-suave-50);
        border-radius: 0.25rem;
        font-family: var(--fuente-titulo);
        font-size: 1.1em;
      }

      &>.input_content {
        position: relative;
        width: 100%;
        font-size: 1.1em;

        & input:valid,
        & textarea:valid {
          border-color: var(--verde);
        }

        & input:invalid:not(:placeholder-shown),
        & textarea:invalid:not(:placeholder-shown) {
          border-color: var(--naranja);
        }

        &>label {
          position: absolute;
          right: 15px;
          top: 5px;
          font-family: var(--fuente-texto);
          font-weight: 300;
        }

        &>input,
        &>textarea {
          width: 100%;
          padding: 0.5rem;
          border: none;
          border-inline-end: 5px solid var(--azul-oscuro);
          /* border-radius: 0.5rem 0 0 0.5rem; */
          font-size: 1em;
          transition: border 0.2s ease-out;

          &:focus {
            outline: none;
            border-inline-start: 3px solid var(--naranja);
            border-inline-end: 5px solid var(--azul-oscuro);
          }
        }

        &>input:focus+label,
        &>textarea:focus+label {
          opacity: 0;
          transition: opacity 0.2s ease-out;
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

    &>.redes_container {

      &>h3 {
        font-size: 1.25em;
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
}

@media screen and (max-width: 767px) {
  .contacto_container {
    padding: 0.5rem;
    animation: fadeIn 0.5s ease-in-out;

    &::before {
      display: none;
    }

    &>.header-contacto {
      &>.titulo_contacto {
        align-items: center;
        font-size: 2em;
        gap: 1rem;

        &>img {
          width: 40px;
          height: 40px;
          margin: 0;
        }

        &>span {
          display: none;
        }
      }

      &>.intro_contacto {
        margin: 0;
        text-align: justify;
      }
    }

    &>.form_content {
      width: 100%;
      row-gap: 1rem;

      &>.redes_container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-block-end: 1rem;
        background: var(--azul-suave-50);
        padding: 0.5rem;
        border-radius: 0.5rem;

        &>h3 {
          margin: 0;
          text-align: center;
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

@media (prefers-reduced-motion: reduce) {
  .contacto_container {
    animation: none;
  }

  .check_icon {
    animation: none;
  }
}
</style>

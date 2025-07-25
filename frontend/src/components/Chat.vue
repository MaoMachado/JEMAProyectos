<script>
import { getSocketCliente } from '@/services/chatService';

import UsuarioRegistro from '@/assets/img/usuario_registro.png';
import EnviarMensaje from '@/assets/img/enviar_mensaje.png';

export default {
  name: 'ChatCliente',

  data() {
    return {
      socket: null,
      nombre: '',
      mensaje: '',
      mensajes: [],
      salaId: null,
      registrado: false,
      conectado: false,
      UsuarioRegistro,
      EnviarMensaje,
      contenedorMensajes: null
    }
  },

  methods: {
    setupSocketListeners() {
      // Limpiar listeners anteriores para evitar duplicados
      this.socket.off('asignarSala');
      this.socket.off('mensajePrivado');
      this.socket.off('chatHabilitado');

      this.socket.on('asignarSala', ({ salaId }) => {
        this.salaId = salaId;

        const nombre = localStorage.getItem('chat_nombre')
        if (nombre) {
          this.socket.emit('nombreCliente', { salaId, nombre })
        }
      });

      this.socket.on('mensajePrivado', (data) => {
        this.mensajes.push(data);

        //Guardar los mensajes actualizados
        localStorage.setItem('chat_mensajes', JSON.stringify(this.mensajes));
      });

      this.socket.on('chatHabilitado', () => {
        this.conectado = true;
      });

      // Verificar si ya hay un salaId asignado
      this.socket.emit('verificarSala', { socketId: this.socket.id });
    },

    registrarNombre() {
      if (this.nombre.trim() !== '') {
        this.$emit('bloquear-cierre')
        this.registrado = true;

        //Guardar en local storage
        localStorage.setItem('chat_nombre', this.nombre);

        // Notificar al admin del nombre usando el salaId correcto
        this.socket.emit('nombreCliente', {
          salaId: this.salaId || this.socket.id,
          nombre: this.nombre
        })
      }
    },

    enviarMensaje() {
      if (this.mensaje.trim() !== '' && this.salaId) {
        const mensajeData = {
          salaId: this.salaId,
          texto: this.mensaje,
          usuario: this.nombre
        };

        this.socket.emit('mensajePrivado', mensajeData);

        this.mensaje = '';
      } else if (this.mensaje.trim() !== '' && !this.salaId) {
        // ✅ Mostrar mensaje de error si no hay salaId
        console.warn('No se puede enviar mensaje: salaId no disponible');
      }
    }
  },

  mounted() {
    this.socket = getSocketCliente();

    //Recuperar Nombre y mensajes guardados de localstorage
    const nombreGuardado = localStorage.getItem('chat_nombre');
    const mensajeGuardado = localStorage.getItem('chat_mensajes');

    if (nombreGuardado) {
      this.nombre = nombreGuardado
      this.registrado = true;
    }

    if (mensajeGuardado) {
      try {
        this.mensajes = JSON.parse(mensajeGuardado);
      } catch (e) {
        this.mensajes = [];
        console.error('Sin mensajes: ', e);
      }
    }

    // Configurar listeners inmediatamente
    this.setupSocketListeners();

    // Listener para cuando el socket se reconecta
    this.socket.on('connect', () => {
      // Reconfigurar listeners cuando se reconecta
      this.setupSocketListeners();
    });

    this.socket.on('chatCerrado', () => {
      alert('El admin a cerrado el chat')

      localStorage.removeItem('chat_nombre');
      localStorage.removeItem('chat_mensajes');

      /**Resetear el estado del componente */
      this.nombre = '';
      this.mensajes = [];
      this.registrado = false;
      this.conectado = false;
    })
  },

  beforeUnmount() {
    // ✅ Limpiar todos los listeners
    this.socket.off('asignarSala');
    this.socket.off('mensajePrivado');
    this.socket.off('chatHabilitado');
    this.socket.off('connect');
  },

  watch: {
    mensajes() {
      this.$nextTick(() => {
        const contenedor = this.$refs.contenedorMensajes;

        if (contenedor) {
          contenedor.scrollTop = contenedor.scrollHeigth;
        }
      })
    }
  }
}
</script>

<template>
  <section class="chat_container">
    <div class="chat_mensaje">
      <section v-if="!registrado" class="registro">
        <input class="registro_nombre" type="text" v-model="nombre" placeholder="Escribe tu nombre" />
        <button class="registro_btn" @click="registrarNombre">
          <img :src="UsuarioRegistro" alt="Boton imagen registrar usuario">
        </button>
      </section>

      <div class="mensaje_espera" v-else-if="!conectado">
        <p>Tu chat está siendo atendido por un administrador. Espera su respuesta.</p>
      </div>

      <section class="chat_usuario_container" v-else>
        <article class="historial_chat_container" ref="contenedorMensajes">
          <p v-for="(msg, i) in mensajes" :key="i" class="mensaje"
            :class="['mensaje', msg.usuario === 'admin' ? 'admin' : 'cliente']">
            {{ msg.usuario }} - {{ msg.texto }}
          </p>
        </article>

        <div class="container_inferior">
          <input class="input_chat" type="text" v-model="mensaje" @keyup.enter="enviarMensaje" placeholder="Aa">
          <button class="btn_chat" @click="enviarMensaje">
            <img :src="EnviarMensaje" alt="Icono de enviar mensaje">
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.chat_container {
  position: fixed;
  bottom: 0;

  &>.chat_mensaje {
    display: grid;
    place-content: center;
    inline-size: 250px;
    block-size: 50vh;

    &>.registro {
      display: flex;
      width: 100%;
      outline: 2px solid var(--verde);

      &>.registro_nombre {
        width: 100%;
        padding-inline: 0.5rem;
        border: none;
        /* font-size: 1em; */

        &:focus {
          border: none;
          outline: none;
        }
      }

      &>.registro_btn {
        cursor: pointer;
        border: none;

        &>img {
          width: 35px;
          height: 35px;
        }
      }
    }

    &>.chat_usuario_container {
      display: flex;
      flex-direction: column;
      justify-content: end;
      row-gap: 0.5rem;
      height: 50vh;
      padding: 0.5rem;

      &>.historial_chat_container {
        display: flex;
        flex-direction: column;
        justify-content: end;
        height: 100%;
        overflow-y: auto;

        &>p {
          background: var(--azul-principal);
          color: var(--blanco);
          margin: 0;
          padding: 0.25rem;
          border-radius: 0.25rem;
          outline: 1px solid var(--verde-50);
        }
      }

      &>.container_inferior {
        display: flex;
        align-items: center;
        outline: 1px solid var(--verde-50);

        &>.input_chat {
          width: 100%;
          height: 100%;
          border: none;
          padding-inline: 1rem;

          &:focus {
            border: none;
            outline: none;
            font-size: 1em;
          }
        }

        &>.btn_chat {
          border: none;
          cursor: pointer;

          &>img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .chat_container {
    width: 95dvw;
    right: 0;
    z-index: 20;

    &>.chat_mensaje {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 70dvh;
      padding: 0.5rem;
      background: var(--azul-claro-50);
      backdrop-filter: blur(10px);
      border-radius: 0.25rem;
      box-shadow: var(--shadow-lg);

      &>.registro {
        width: 80%;
        display: flex;
        transition: all 0.2s ease;

        &>.registro_nombre {
          width: 100%;
          padding: 0.5rem;
          font-family: var(--fuente-titulo);
          font-size: 1em;
          border: none;

          &:focus {
            border: none;
            outline: none;
          }
        }

        &:focus-within {
          outline: 2px solid var(--verde);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        &>.registro_btn {
          width: 45px;
          height: 45px;
          border: none;

          &>img {
            width: 100%;
          }
        }
      }

      &>.mensaje_espera {
        text-align: center;

        &>p {
          color: var(--blanco);
          font-size: 1.2em;
          margin: 0;
        }
      }

      &>.chat_usuario_container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;

        &>.historial_chat_container {
          height: 100%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          row-gap: 0.5rem;
          padding: 0.5rem;

          &>.mensaje {
            width: fit-content;
            padding: 0.2rem 0.4rem;
            margin: 0;
            background: var(--azul-principal);
            color: var(--blanco);
            font-size: 1.2em;
            border-radius: 0.5rem;
          }
        }

        &>.container_inferior {
          display: flex;
          align-items: center;
          width: 80%;
          margin-top: 1rem;
          margin-inline: auto;
          border-radius: 0.5rem;
          overflow: hidden;

          &>.input_chat {
            width: 100%;
            height: 100%;
            padding: 0 1rem;
            font-family: var(--fuente-parrafo);
            font-size: 1em;
            border: none;

            &:focus {
              border: none;
              outline: none;
            }
          }

          &:focus-within {
            outline: 2px solid var(--verde);
            border-radius: 0.5rem;
            overflow: hidden;
          }

          &>.btn_chat {
            width: 40px;
            height: 40px;
            border: none;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}

.mensaje.admin {
  align-self: flex-start;
}

.mensaje.cliente {
  align-self: flex-end;
  margin-left: 5px;
}
</style>

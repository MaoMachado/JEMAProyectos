<script>
import { getSocketAdmin } from '@/services/chatService';

import user from '@/assets/img/usuario_registro.png';
import eliminarChat from '@/assets/img/cerrar.gif';

export default {
  name: 'ChatAdmin',

  data() {
    return {
      socket: null,
      salas: {},
      salaActiva: null,
      mensaje: '',
      mensajesPorSala: {},
      user,
      eliminarChat
    }
  },

  mounted() {
    this.socket = getSocketAdmin();
    this.setupSocketListeners();

    localStorage.removeItem('admin_salas')

    const mensajesGuardados = localStorage.getItem('admin_mensajes');
    const salaActivaGuardada = localStorage.getItem('admin_sala_activa');

    if (salaActivaGuardada && this.salas[salaActivaGuardada]) {
      this.salaActiva = salaActivaGuardada;
      this.socket.emit('adminEntraSala', { salaId: salaActivaGuardada })
    }

    if (mensajesGuardados) {
      try {
        this.mensajesPorSala = JSON.parse(mensajesGuardados);
      } catch (e) {
        console.error('Error cargando mensajes del localStorage', e);
      }
    }

    this.salaActivaPendiente = salaActivaGuardada;
  },

  beforeUnmount() {
    // ✅ Limpiar todos los listeners
    this.socket.off('nuevaSala');
    this.socket.off('salaCerrada');
    this.socket.off('mensajePrivado');
  },

  methods: {
    debugSalas() {
      console.log('Socket ID del admin:', this.socket?.id);
      console.log('Salas disponibles:', this.salas);
      console.log('Salas filtradas:', this.salasFiltradas);
    },

    setupSocketListeners() {
      // Limpiar listeners anteriores para evitar duplicados
      this.socket.off('nuevaSala');
      this.socket.off('salaCerrada');
      this.socket.off('mensajePrivado');

      this.socket.on('nuevaSala', ({ salaId, nombre }) => {
        if (salaId !== this.socket.id && !this.salas[salaId]) {
          this.salas[salaId] = nombre || salaId;

          if (!this.mensajesPorSala[salaId]) {
            this.mensajesPorSala[salaId] = [];
          }

          if (this.salaActivaPendiente && this.salaActivaPendiente === salaId) {
            this.seleccionarSala(salaId);
            this.salaActivaPendiente = null;
          }

          this.guardarEstadoLocal();
        }
      });

      this.socket.on('salaCerrada', ({ salaId }) => {
        delete this.salas[salaId];
        delete this.mensajesPorSala[salaId];
        if (this.salaActiva === salaId) this.salaActiva = null;

        this.guardarEstadoLocal();
      });

      this.socket.on('mensajePrivado', ({ salaId, texto, usuario }) => {
        if (!this.mensajesPorSala[salaId]) {
          this.mensajesPorSala[salaId] = [];
        }

        if (usuario !== 'admin') {
          this.mensajesPorSala[salaId].push({ texto, usuario });
          this.guardarEstadoLocal();
        }
      });
    },

    seleccionarSala(salaId) {
      if (!salaId) return;
      this.salaActiva = salaId;
      this.socket.emit('adminEntraSala', { salaId });

      localStorage.setItem('admin_sala_activa', salaId)
    },

    enviarMensaje() {
      if (!this.salaActiva || this.mensaje.trim() === '') return;

      const data = {
        salaId: this.salaActiva,
        texto: this.mensaje,
        usuario: 'admin'
      };

      this.socket.emit('mensajePrivado', data);

      // ✅ Asegurar que el array existe antes de hacer push
      if (!this.mensajesPorSala[this.salaActiva]) {
        this.mensajesPorSala[this.salaActiva] = [];
      }

      this.mensajesPorSala[this.salaActiva].push({
        texto: this.mensaje,
        usuario: 'admin'
      });

      this.guardarEstadoLocal();

      this.mensaje = '';
    },

    guardarEstadoLocal() {
      localStorage.setItem('admin_mensajes', JSON.stringify(this.mensajesPorSala));
    },

    eliminarSala(salaId) {
      if (!salaId) return;

      // Eliminar sala y mensaje del estado local
      delete this.salas[salaId];
      delete this.mensajesPorSala[salaId];

      if (this.salaActiva === salaId) {
        this.salaActiva = null;
        localStorage.removeItem('admin_sala_activa')
      }

      this.guardarEstadoLocal();

      this.socket.emit('cerrarSalaManual', { salaId })
    }
  },

  computed: {
    mensajes() {
      return this.mensajesPorSala[this.salaActiva] || [];
    },

    salasFiltradas() {
      const result = {};

      Object.keys(this.salas).forEach(salaId => {
        const tieneMensajes = this.mensajesPorSala[salaId] && this.mensajesPorSala[salaId].length > 0;
        const esUsuarioReal = this.salas[salaId] && this.salas[salaId] !== salaId; // Tiene nombre personalizado

        if (tieneMensajes || esUsuarioReal) {
          result[salaId] = this.salas[salaId];
        }
      });

      return result;
    }
  },
}
</script>

<template>
  <main class="chat_admin" role="main" aria-labelledby="chat-admin-title">
    <h2 id="chat-admin-title">CHATS CON CLIENTES</h2>

    <aside class="salas">
      <h3>Salas activas</h3>
      <ul class="lista_salas" role="listbox" aria-label="Salas activas">
        <li v-for="(nombre, salaId) in salasFiltradas" :key="salaId" @click="seleccionarSala(salaId)" class="sala"
          :class="{ activa: salaActiva === salaId }" role="option" :aria-selected="salaActiva === salaId">
          <img class="img_user_chat" :src="user" alt="Icono del usuario" loading="lazy" />
          {{ nombre }}
          <button type="button" class="btn_eliminar_chat" @click.stop="eliminarSala(salaId)"
            @keydown.enter.stop="eliminarSala(salaId)" aria-label="Eliminar sala {{ nombre }}">
            <img class="img_eliminar" :src="eliminarChat" alt="Icono de eliminar el chat" loading="lazy" />
          </button>
        </li>
      </ul>
    </aside>

    <section class="chat_admin_container" aria-label="Mensaje del chat">
      <article class="mensajes">
        <div v-for="(msg, i) in mensajes" :key="i" :class="['mensaje', msg.usuario === 'admin' ? 'admin' : 'cliente']">
          <strong>{{ msg.usuario }}: </strong> {{ msg.texto }}
        </div>
      </article>

      <div class="input_mensaje" role="form" aria-label="Enviar mensaje">
        <input v-model="mensaje" @keyup.enter="enviarMensaje" placeholder="Escribe una respuesta..."
          aria-label="Escribe una respuesta" />
        <button type="button" @click="enviarMensaje" aria-label="Enviar mensaje">Enviar</button>
      </div>
    </section>
  </main>
</template>


<style scoped>
.chat_admin {
  inline-size: clamp(300px, 100%, 1500px);
  margin-inline: auto;
  padding: 0.5rem;

  &:hover {
    background: var(--azul-suave);
  }

  &>h2 {
    text-align: center;
  }
}

.salas {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  &>h3 {
    text-align: center;
  }

  &>.lista_salas {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    list-style: none;

    &>.sala {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
      justify-content: space-around;
      width: 300px;
      padding: 0.25rem 0.5rem;
      background: var(--verde-50);
      outline: 1px solid var(--verde);
      border-radius: 0.25rem;
      cursor: pointer;

      &>.img_user_chat {
        width: 30px;
        height: 30px;
        object-fit: cover;
      }

      &>.btn_eliminar_chat {
        width: 30px;
        height: 30px;
        background: transparent;
        border: none;
        cursor: pointer;

        &>.img_eliminar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &.activa {
        background: #007bff;
        color: white;
      }
    }
  }
}

.chat_admin_container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  row-gap: 0.5rem;
  inline-size: clamp(300px, 100%, 400px);
  block-size: 250px;
  margin-inline: auto;

  &>.mensajes {
    &.admin {
      background-color: #a2d2ff;
      text-align: right;
    }

    &.cliente {
      background-color: #e0e0e0;
      text-align: left;
    }
  }

  &>.input_mensaje {
    display: flex;
    column-gap: 0.25rem;

    &>input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1em;
      font-family: var(--fuente-parrafo);
      border: none;
      outline: 1px solid var(--verde-50);
    }

    &>button {
      padding-inline: 0.5rem;
      border: none;
    }
  }
}

@media screen and (max-width: 767px) {
  .chat_admin {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    block-size: 100dvh;

    &>h2 {
      font-size: 1.8em;
    }
  }

  .chat_admin_container {
    height: 100%;

    &>.mensajes {
      height: 100%;
    }
  }
}
</style>

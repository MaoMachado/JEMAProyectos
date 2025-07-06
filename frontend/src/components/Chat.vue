<script>
import { getSocketCliente } from '@/services/chatService';

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
      conectado: false
    }
  },

  mounted() {
    this.socket = getSocketCliente();

    // Configurar listeners inmediatamente
    this.setupSocketListeners();

    // Listener para cuando el socket se reconecta
    this.socket.on('connect', () => {
      // Reconfigurar listeners cuando se reconecta
      this.setupSocketListeners();
    });
  },

  methods: {
    setupSocketListeners() {
      // Limpiar listeners anteriores para evitar duplicados
      this.socket.off('asignarSala');
      this.socket.off('mensajePrivado');
      this.socket.off('chatHabilitado');

      this.socket.on('asignarSala', ({ salaId }) => {
        this.salaId = salaId;
      });

      this.socket.on('mensajePrivado', (data) => {
        this.mensajes.push(data);
      });

      this.socket.on('chatHabilitado', () => {
        this.conectado = true;
      });

      // Verificar si ya hay un salaId asignado
      this.socket.emit('verificarSala', { socketId: this.socket.id });
    },

    registrarNombre() {
      if (this.nombre.trim() !== '') {
        this.registrado = true;
        // Notificar al admin del nombre usando el salaId correcto
        this.socket.emit('nombreCliente', {
          salaId: this.salaId || this.socket.id, // ✅ Usar this.salaId si está disponible
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

  beforeUnmount() {
    // ✅ Limpiar todos los listeners
    this.socket.off('asignarSala');
    this.socket.off('mensajePrivado');
    this.socket.off('chatHabilitado');
    this.socket.off('connect');
  }
}
</script>

<template>
  <section class="chat_container">
    <div class="chat_mensaje">
      <section v-if="!registrado" class="registro">
        <input type="text" v-model="nombre" placeholder="Escribe tu nombre" />
        <button @click="registrarNombre">Entrar Al Chat</button>
      </section>

      <div v-else-if="!conectado">
        <p>Tu chat está siendo atendido por un administrador. Espera su respuesta.</p>
      </div>

      <section v-else>
        <div v-for="(msg, i) in mensajes" :key="i" class="mensaje">
          {{ msg.usuario }} - {{ msg.texto }}
        </div>

        <div class="chat_input">
          <input type="text" v-model="mensaje" @keyup.enter="enviarMensaje" placeholder="Escribe tu mensaje">
          <button @click="enviarMensaje">Enviar</button>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.chat_container {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10px;

  &>.chat_mensaje {
    max-height: 300px;
    overflow-y: auto;

    &>.mensaje {
      padding: 0.5rem;
      margin: 0.3rem 0;
      background: var(--azul-oscuro-50);
      border-radius: 0.5rem;
      color: var(--blanco);
    }

    &>.chat_input {
      display: flex;
      gap: 0.5rem;

      &>input {
        flex: 1;
        padding: 0.5rem;
        border-radius: 0.5;
        border: 1px solid var(--naranja);
      }

      &>button {
        padding: 0.5rem 1rem;
        border: none;
        background: var(--azul-principal);
        color: white;
        border-radius: 0.5rem;
        cursor: pointer;
      }
    }
  }

}
</style>

<script>
import { getSocketAdmin } from '@/services/chatService';

export default {
  name: 'ChatAdmin',
  data() {
    return {
      socket: null,
      salas: {},
      salaActiva: null,
      mensaje: '',
      mensajesPorSala: {}
    }
  },

  mounted() {
    this.socket = getSocketAdmin();
    this.setupSocketListeners();
  },

  methods: {
    setupSocketListeners() {
      // Limpiar listeners anteriores para evitar duplicados
      this.socket.off('nuevaSala');
      this.socket.off('salaCerrada');
      this.socket.off('mensajePrivado');

      this.socket.on('nuevaSala', ({ salaId, nombre }) => {
        this.salas[salaId] = nombre || salaId;
        if (!this.mensajesPorSala[salaId]) {
          this.mensajesPorSala[salaId] = [];
        }
      });

      this.socket.on('salaCerrada', ({ salaId }) => {
        delete this.salas[salaId];
        delete this.mensajesPorSala[salaId];
        if (this.salaActiva === salaId) this.salaActiva = null;
      });

      this.socket.on('mensajePrivado', ({ salaId, texto, usuario }) => {
        if (!this.mensajesPorSala[salaId]) {
          this.mensajesPorSala[salaId] = [];
        }

        if (usuario !== 'admin') {
          this.mensajesPorSala[salaId].push({ texto, usuario });
        }
      });
    },

    seleccionarSala(salaId) {
      if (!salaId) return; // ✅ Validación adicional
      this.salaActiva = salaId;
      this.socket.emit('adminEntraSala', { salaId });
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

      this.mensaje = '';
    }
  },

  computed: {
    mensajes() {
      return this.mensajesPorSala[this.salaActiva] || [];
    }
  },

  beforeUnmount() {
    // ✅ Limpiar todos los listeners
    this.socket.off('nuevaSala');
    this.socket.off('salaCerrada');
    this.socket.off('mensajePrivado');
  }
}
</script>

<template>
  <section class="chat_admin">
    <h2>Chat con clientes</h2>

    <aside class="salas">
      <h3>Salas activas</h3>
      <ul>
        <li v-for="(nombre, salaId) in salas" :key="salaId" @click="seleccionarSala(salaId)"
          :class="{ activa: salaActiva === salaId }">
          {{ nombre }}
        </li>
      </ul>
    </aside>

    <div class="mensajes">
      <div v-for="(msg, i) in mensajes" :key="i" :class="['mensaje', msg.usuario === 'admin' ? 'admin' : 'cliente']">
        <strong>{{ msg.usuario }}: </strong> {{ msg.texto }}
      </div>
    </div>

    <div class="input_mensaje">
      <input v-model="mensaje" @keyup.enter="enviarMensaje" placeholder="Escribe una respuesta..." />
      <button @click="enviarMensaje">Enviar</button>
    </div>
  </section>
</template>


<style scoped>
.salas {
  margin-bottom: 1rem;
}

.salas ul {
  list-style: none;
  padding: 0;
}

.salas li {
  padding: 0.5rem;
  cursor: pointer;
  background: #eee;
  margin-bottom: 0.3rem;
}

.salas li.activa {
  background: #007bff;
  color: white;
}

.mensaje.admin {
  background-color: #a2d2ff;
  text-align: right;
}

.mensaje.cliente {
  background-color: #e0e0e0;
  text-align: left;
}
</style>

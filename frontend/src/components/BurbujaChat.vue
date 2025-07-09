<script>
import { computed, markRaw, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import IconoChat from '@/assets/img/chat.png'
import Chat from './Chat.vue';

export default {
  data() {
    return {
      IconoChat,
    }
  },

  components: {
    Chat
  },

  setup() {
    const route = useRoute();
    const ChatCliente = ref(null);
    const mostrarChat = ref(false);
    const chatRef = ref(null);
    const bloquearOcultar = ref(false);

    const esRutaAdmin = computed(() => route.path.startsWith('./admin'));

    watch(esRutaAdmin, async (isAdmin) => {
      if (!isAdmin) {
        try {
          const { default: ChatComponent } = await import('../components/Chat.vue');
          ChatCliente.value = markRaw(ChatComponent);
        } catch (error) {
          console.error('Error Cargando Chat: ', error);
          ChatCliente.value = null;
        }
      } else {
        ChatCliente.value = null;
      }
    }, { immediate: true });

    const handleClickOutSide = (e) => {
      if (bloquearOcultar.value) return; // 👈 Ignora el click si venimos de registrar nombre

      if (!chatRef.value) return;
      if (!chatRef.value.contains(e.target)) {
        mostrarChat.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutSide)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutSide)
    })

    const evitarCierrePorRegistro = () => {
      bloquearOcultar.value = true;
      setTimeout(() => {
        bloquearOcultar.value = false;
      }, 100); // tiempo suficiente para que el DOM se estabilice
    };

    return {
      ChatCliente,
      esRutaAdmin,
      mostrarChat,
      chatRef,
      evitarCierrePorRegistro,
      toggleChat: () => mostrarChat.value = !mostrarChat.value
    }
  }
}
</script>

<template>
  <section class="burbuja_chat" ref="chatRef">
    <button @click="toggleChat" aria-label="Abrir chat">
      <img :src="IconoChat" alt="Icono del Chat">
    </button>

    <div v-if="!esRutaAdmin && ChatCliente && mostrarChat">
      <component :is="ChatCliente" @bloquear-cierre="evitarCierrePorRegistro" />
    </div>
  </section>
</template>

<style scoped>
.burbuja_chat {
  display: none;
}

@media screen and (max-width: 767px) {
  .burbuja_chat {
    position: absolute;
    bottom: 0;
    right: 5px;
    display: block;

    &>button {
      width: 45px;
      height: 45px;
      background: none;
      border: none;

      &>img {
        width: 100%;
      }
    }
  }
}
</style>

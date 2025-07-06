<script>
import { computed, ref, watch, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import NavbarComponent from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
  },

  setup() {
    const route = useRoute();
    const ChatCliente = ref(null);

    const esRutaAdmin = computed(() =>
      route.path.startsWith('/admin')
    );

    watch(esRutaAdmin, async (isAdmin) => {
      if (!isAdmin) {
        try {
          const { default: ChatComponent } = await import('./components/Chat.vue');
          ChatCliente.value = markRaw(ChatComponent);
        } catch (error) {
          console.error('Error cargando Chat component:', error);
          ChatCliente.value = null;
        }
      } else {
        ChatCliente.value = null;
      }
    }, { immediate: true });

    return {
      ChatCliente,
      esRutaAdmin
    };
  }
}
</script>

<template>
  <div class="app_container">
    <header class="nav_principal_container">
      <NavbarComponent />
      <div v-if="!esRutaAdmin && ChatCliente">
        <component :is="ChatCliente" />
      </div>
    </header>

    <main class="app_main" id="app_main">
      <router-view />
    </main>
  </div>
</template>

<style>
.app_container {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--gris-claro);
  inline-size: 100dvw;

  &>.nav_principal_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100dvh;
    background-color: var(--azul-suave);
    z-index: 100;
  }

  &>.app_main {
    margin-left: 250px;
    width: calc(100vw - 250px);
    height: 100dvh;
    overflow-y: auto;
    position: relative;
  }
}

.chat-loading {
  padding: 1rem;
  text-align: center;
  color: #666;
}
</style>

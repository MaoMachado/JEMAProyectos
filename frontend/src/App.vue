<script>
import { computed, ref, watch, markRaw, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import NavbarComponent from './components/Navbar.vue';
import iconoMenuMobil from '@/assets/img/menu_mobile.png';
import JemaLogo from '@/assets/img/Jema.png';
import iconoCerrarMenu from '@/assets/img/cerrar.gif';
import FooterContainer from './components/Footer.vue';

export default {
  name: 'App',

  data() {
    return {
      iconoMenuMobil,
      iconoCerrarMenu,
      JemaLogo,
    }
  },

  components: {
    NavbarComponent,
    FooterContainer
  },

  setup() {
    const route = useRoute();
    const ChatCliente = ref(null);
    const mostrarMenu = ref(false);
    const esDesktop = ref(window.innerWidth >= 768);
    const esRutaAdmin = computed(() => route.path.startsWith('/admin'));
    const errorCargandoChat = ref(false);
    const handleResize = () => {
      esDesktop.value = window.innerWidth >= 768;
      mostrarMenu.value = esDesktop.value;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      handleResize();

      watch(route, () => {
        mostrarMenu.value = window.innerWidth >= 768;
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    watch(esRutaAdmin, async (isAdmin) => {
      if (!isAdmin) {
        try {
          const { default: ChatComponent } = await import('./components/Chat.vue');
          ChatCliente.value = markRaw(ChatComponent);
          errorCargandoChat.value = false;
        } catch (error) {
          console.error('Error cargando Chat component:', error);
          ChatCliente.value = null;
          errorCargandoChat.value = true;
        }
      } else {
        ChatCliente.value = null;
      }
    }, { immediate: true });

    return {
      ChatCliente,
      esRutaAdmin,
      mostrarMenu,
      esDesktop,
      errorCargandoChat
    };
  }
}
</script>

<template>
  <div class="app_container" role="application">
    <transition name="slide-menu">
      <header class="nav_principal_container" v-if="mostrarMenu" role="navigation" aria-label="Navegacion principal">
        <NavbarComponent @cerrar-menu="mostrarMenu = false" />
        <button class="menu_cerrar_container" @click="mostrarMenu = false" aria-label="Cerrar menú de navegación">
          <img :src="iconoCerrarMenu" alt="Icono de cerrar el menu" loading="lazy" />
        </button>
      </header>
    </transition>

    <main class="app_main" id="app_main" role="main">
      <header class="header_menu" v-if="!mostrarMenu" role="banner">
        <button class="menu_mobil" @click="mostrarMenu = true" aria-label="Abrir menú de navegación"
          aria-expanded="false">
          <img :src="iconoMenuMobil" alt="Icono Imagen Menu" loading="lazy">
        </button>
        <img class="logo_jema" :src="JemaLogo" alt="Logo JEMA" loading="lazy">
      </header>
      <router-view />
    </main>

    <FooterContainer />
  </div>
</template>

<style>
.app_container {
  display: flex;
  flex-direction: column;
}

.nav_principal_container {
  position: sticky;
  top: 0;
  z-index: 100;

  &>.menu_mobil {
    display: none;
  }

  &>.menu_cerrar_container {
    display: none;
  }
}

.app_main {

  &>.menu_mobil {
    display: none;
  }
}

.chat-loading {
  padding: 1rem;
  text-align: center;
  color: #666;
}

@media screen and (max-width: 767px) {
  .nav_principal_container {}

  .header_menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    background: var(--azul-suave-50);
    backdrop-filter: blur(5px );
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .menu_mobil {
    width: 40px;
    height: 40px;
    padding: 2.5px;
    background: transparent;
    border: 2px solid var(--azul-principal-50);
    border-radius: 10px;

    &>img {
      width: 100%;
    }
  }

  .logo_jema {
    width: 120px;
  }
}

@media (prefers-reduced-motion: reduce) {

  .slide-menu-enter-active,
  .slide-menu-leave-active {
    transition: none;
  }

  .slide-menu-enter-from,
  .slide-menu-leave-to {
    transform: none;
    opacity: 1;
  }
}
</style>

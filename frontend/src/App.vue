<script>
import { computed, ref, watch, markRaw, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import NavbarComponent from './components/Navbar.vue';
import iconoMenuMobil from '@/assets/img/menu_mobile.png';
import JemaLogo from '@/assets/img/Jema.png';
import iconoCerrarMenu from '@/assets/img/cerrar.gif';
// import BurbujaChat from './components/BurbujaChat.vue';


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
    // BurbujaChat
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

    <!-- Chat solo en mobile -->
    <!-- <BurbujaChat v-if="!esRutaAdmin && !esDesktop" /> -->

    <!-- Chat fijo en escritorio -->
    <!-- <div v-if="!ChatCliente && !esRutaAdmin && esDesktop" class="chat-loading">
      <p>Cargando chat...</p>
    </div>
    <component :is="ChatCliente" v-show="!esRutaAdmin && esDesktop" />
    <div v-if="errorCargandoChat" class="chat-error">
      <p>Error al cargar el chat.</p>
    </div> -->
  </div>
</template>

<style>
.app_container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  &>.nav_principal_container {
    /* position: sticky;
    top: 0; */

    &>.menu_mobil {
      display: none;
    }

    &>.menu_cerrar_container {
      display: none;
    }
  }

  &>.app_main {

    &>.menu_mobil {
      display: none;
    }
  }
}

.chat-loading {
  padding: 1rem;
  text-align: center;
  color: #666;
}

@media screen and (max-width: 767px) {
  .app_container {

    .nav_principal_container {
      width: 100%;
      background: var(--azul-suave-50);
      backdrop-filter: blur(8px);
      position: fixed;
      z-index: 100;

      &>.menu_cerrar_container {
        display: block;
        cursor: pointer;
        border: none;
        border-radius: 0.25rem;
        position: absolute;
        bottom: 0;
        right: 0;
        transition: background 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .app_main {
      inline-size: 100%;
      margin: 0;

      &>.header_menu {
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        background: var(--azul-suave-50);
        backdrop-filter: blur(5px);
        z-index: 10;

        &>.menu_mobil {
          /* display: block; */
          width: 35px;
          height: 35px;
          padding: 0.25rem;
          border: none;
          border-radius: 0.5rem;

          &>img {
            width: 100%;
            height: 100%;
          }
        }

        &>.logo_jema {
          width: 40%;
          margin-inline: auto;
        }
      }

    }
  }

  /* Animación del menú */
  .slide-menu-enter-active,
  .slide-menu-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .slide-menu-enter-from,
  .slide-menu-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  .slide-menu-enter-to,
  .slide-menu-leave-from {
    transform: translateX(0);
    opacity: 1;
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

<script>
import { computed, ref, watch, markRaw, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import NavbarComponent from './components/Navbar.vue';
import iconoMenuMobil from '@/assets/img/menu_mobile.png';
import JemaLogo from '@/assets/img/Jema.png';
import iconoCerrarMenu from '@/assets/img/cerrar.gif';
import BurbujaChat from './components/BurbujaChat.vue';


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
    BurbujaChat
  },

  setup() {
    const route = useRoute();
    const ChatCliente = ref(null);
    const mostrarMenu = ref(false);

    const esDesktop = computed(() => window.innerWidth >= 768);

    const esRutaAdmin = computed(() =>
      route.path.startsWith('/admin')
    );

    onMounted(() => {
      const handleResize = () => {
        mostrarMenu.value = window.innerWidth >= 768;
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      watch(route, () =>{
        mostrarMenu.value = window.innerWidth >= 768;
      })

      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
      });
    });

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
      esRutaAdmin,
      mostrarMenu,
      esDesktop
    };
  },
}
</script>

<template>
  <div class="app_container">
    <transition name="slide-menu">
      <header class="nav_principal_container" v-if="mostrarMenu">
        <NavbarComponent @cerrar-menu="mostrarMenu = false" />
        <span class="menu_cerrar_container" @click="mostrarMenu = false">
          <img :src="iconoCerrarMenu" alt="Icono de cerrar el menu">
        </span>
      </header>
    </transition>

    <main class="app_main" id="app_main">
      <header class="header_menu" v-if="!mostrarMenu" @click="mostrarMenu = true">
        <div class="menu_mobil">
          <img :src="iconoMenuMobil" alt="Icono Imagen Menu">
        </div>
        <img class="logo_jema" :src="JemaLogo" alt="Logo JEMA">
      </header>
      <router-view />
    </main>

    <BurbujaChat />
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

    &>.menu_mobil {
      display: none;
    }

    &>.menu_cerrar_container {
      display: none;
    }
  }

  &>.app_main {
    margin-left: 250px;
    width: calc(100vw - 250px);
    height: 100dvh;
    overflow-y: auto;
    position: relative;

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
      backdrop-filter: blur(5px);
      padding-top: 1rem;

      &>.menu_cerrar_container {
        display: block;
        position: absolute;
        right: 5px;
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
          display: block;
          width: 30px;
          height: 30px;
          padding: 0.25rem;
          border-radius: 0.5rem;
          background: var(--azul-suave);

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
</style>

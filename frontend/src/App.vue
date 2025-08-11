<script>
import { computed, ref, watch, markRaw, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import NavbarComponent from './components/Navbar.vue';
import FooterContainer from './components/Footer.vue';

import iconoMenuMobil from '@/assets/img/menu_mobile.png';
import JemaLogo from '@/assets/img/Jema.png';
import iconoCerrarMenu from '@/assets/img/cerrar.gif';

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
    const menuAnimating = ref(false);

    const handleResize = () => {
      esDesktop.value = window.innerWidth >= 768;
      mostrarMenu.value = esDesktop.value;
    };

    const toggleMenu = (state) => {
      if (menuAnimating.value) return;

      menuAnimating.value = true;
      mostrarMenu.value = state;

      // Prevenir scroll cuando el menú está abierto en móvil
      if (!esDesktop.value) {
        document.body.style.overflow = state ? 'hidden' : '';
      }

      setTimeout(() => {
        menuAnimating.value = false;
      }, 300);
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      handleResize();

      watch(route, () => {
        if (!esDesktop.value) {
          mostrarMenu.value = false;
          document.body.style.overflow = '';
        } else {
          mostrarMenu.value = true;
        }
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
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
      errorCargandoChat,
      menuAnimating,
      toggleMenu,
    };
  }
}
</script>

<template>
  <div class="app_container" role="application">

    <transition name="fade">
      <div v-if="!esDesktop && mostrarMenu" class="menu_overlay" @click="toggleMenu(false)" aria-hidden="true"></div>
    </transition>

    <transition name="slide-menu">
      <header class="nav_principal_container" v-if="mostrarMenu" role="navigation" aria-label="Navegación principal">
        <NavbarComponent @cerrar-menu="toggleMenu(false)" />
        <button v-if="!esDesktop" class="menu_cerrar_container" @click="toggleMenu(flse)"
          aria-label="Cerrar menú de navegación" :disabled="menuAnimating">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </header>
    </transition>

    <main class="app_main" id="app_main" role="main">
      <header class="header_menu" v-if="!esDesktop && !mostrarMenu" role="banner">

        <div class="header_menu_container">
          <button class="menu_mobil" @click="toggleMenu(true)" aria-label="Abrir menú de navegación"
            :aria-expanded="mostrarMenu" :disabled="menuAnimating">
            <span class="hamburger_line"></span>
            <span class="hamburger_line"></span>
            <span class="hamburger_line"></span>
          </button>

          <!-- Logo -->
          <div class="logo_mobile_container">
            <RouterLink to="/" class="logo_link">
              <img class="logo_jema" :src="JemaLogo" alt="Logo JEMA" loading="lazy">
            </RouterLink>
          </div>

          <!-- Botón CTA móvil -->
          <router-link to="/cotizacion" class="mobile_cta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </router-link>
        </div>
      </header>

      <!-- Contenido De La Pagina -->
      <div class="page_content">
        <router-view v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>

      <!-- Chat flotante (si no es admin) -->
      <!-- <transition name="chat-float">
        <component v-if="ChatCliente && !esRutaAdmin" :is="ChatCliente" class="chat_flotante" />
      </transition> -->
    </main>

    <!-- Footer -->
    <FooterContainer />

    <!-- Indicador de carga del chat -->
    <div v-if="errorCargandoChat && !esRutaAdmin" class="chat-error">
      <p>Chat temporalmente no disponible</p>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal */
.app_container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

/* Navbar desktop */
.nav_principal_container {
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

/* Contenido principal */
.app_main {
  flex: 1;
  position: relative;
  background: linear-gradient(180deg, var(--blanco) 0%, var(--gris-claro) 100%);
  min-height: calc(100vh - 80px);
}

.page_content {
  width: 100%;
  position: relative;
}

/* Chat flotante */
.chat_flotante {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 900;
}

.chat-error {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--gris-oscuro);
  color: var(--blanco);
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 900;
}

/* Estilos móvil */
@media screen and (max-width: 767px) {

  /* Overlay del menú */
  .menu_overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(30, 73, 113, 0.4);
    backdrop-filter: blur(4px);
    z-index: 999;
  }

  /* Header móvil */
  .header_menu {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(30, 73, 113, 0.1);
    height: var(--header-mobile-height);
    animation: slideDown 0.3s ease-out;
  }

  .header_menu_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    height: 100%;
  }

  /* Botón hamburguesa mejorado */
  .menu_mobil {
    width: 44px;
    height: 44px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background: var(--azul-suave);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-speed) ease;
    position: relative;
  }

  .hamburger_line {
    width: 24px;
    height: 2px;
    background: var(--azul-principal);
    border-radius: 2px;
    transition: all var(--transition-speed) ease;
  }

  .menu_mobil:hover {
    background: var(--azul-principal);
    transform: scale(1.05);
  }

  .menu_mobil:hover .hamburger_line {
    background: var(--blanco);
  }

  .menu_mobil:active {
    transform: scale(0.95);
  }

  .menu_mobil:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Logo móvil */
  .logo_mobile_container {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .logo_link {
    display: inline-block;
    height: 40px;
  }

  .logo_jema {
    height: 100%;
    width: auto;
    filter: drop-shadow(0 2px 4px rgba(30, 73, 113, 0.1));
  }

  /* CTA móvil */
  .mobile_cta {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--naranja) 0%, #ff8a65 100%);
    border-radius: var(--border-radius);
    color: var(--blanco);
    box-shadow: 0 4px 12px var(--naranja-50);
    transition: all var(--transition-speed) ease;
  }

  .mobile_cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px var(--naranja-50);
  }

  .mobile_cta:active {
    transform: scale(0.95);
  }

  /* Menú lateral móvil */
  .nav_principal_container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1001;
  }

  /* Botón cerrar menú */
  .menu_cerrar_container {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--azul-principal);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: var(--blanco);
    box-shadow: 0 4px 12px var(--azul-principal-50);
    transition: all var(--transition-speed) ease;
    z-index: 10;
  }

  .menu_cerrar_container:hover {
    background: var(--azul-oscuro);
    transform: rotate(90deg) scale(1.1);
  }

  .menu_cerrar_container:active {
    transform: rotate(90deg) scale(0.9);
  }

  .menu_cerrar_container:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Chat flotante móvil */
  .chat_flotante {
    bottom: 70px;
    right: 10px;
  }
}

/* Animaciones */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Transición del menú lateral */
.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-menu-enter-from {
  transform: translateX(-100%);
}

.slide-menu-leave-to {
  transform: translateX(-100%);
}

/* Transición del overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-speed) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transición de páginas */
.page-enter-active,
.page-leave-active {
  transition: all var(--transition-speed) ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Transición del chat */
.chat-float-enter-active,
.chat-float-leave-active {
  transition: all var(--transition-speed) ease;
}

.chat-float-enter-from,
.chat-float-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Desktop styles */
@media screen and (min-width: 768px) {
  .header_menu {
    display: none;
  }

  .menu_cerrar_container {
    display: none;
  }

  .menu_overlay {
    display: none;
  }
}

/* Accesibilidad - Focus visible */
button:focus-visible,
a:focus-visible {
  outline: 3px solid var(--azul-claro);
  outline-offset: 2px;
}

/* Reducción de movimiento */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .slide-menu-enter-active,
  .slide-menu-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .page-enter-active,
  .page-leave-active,
  .chat-float-enter-active,
  .chat-float-leave-active {
    transition: none;
  }
}

/* Utilidades */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>

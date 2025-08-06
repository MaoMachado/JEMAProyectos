<script>

import logoJema from '@/assets/img/Jema.png'
import InicioIcon from '@/assets/img/inicio.png'
import JoyasIcon from '@/assets/img/joyas.png'
import SobreMi from '@/assets/img/sobre-mi.png'

export default {
  name: 'NavbarComponent',

  emits: ['cerrar-menu'],

  data() {
    return {
      logoJema,
      InicioIcon,
      JoyasIcon,
      SobreMi,
      mostrarMenu: false,
      isScrolled: false,
      ticking: false,
    }
  },

  methods: {
    cerrarMenu() {
      this.$emit('cerrar-menu');

      this.$nextTick(() => {
        const menuButton = document.querySelector('.menu_mobil');
        if (menuButton) {
          menuButton.focus();
        }
      });
    },

    handleKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.cerrarMenu();
      }
    },

    handleScroll() {
      this.isScrolled = window.scrollY > 80

      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.isScrolled = window.scrollY > 200
          this.ticking = false
        })
        this.ticking = true
      }
    }
  },

  mounted() {
    const img = new Image();
    img.src = this.logoJema;

    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<template>
  <nav :class="['navbar', { transparent: isScrolled }]" role="navigation" aria-label="Navegacion Principal">

    <section class="navbar-container" ref="heroSection">
      <div class="logo_container">
        <RouterLink to="/"><img :src="logoJema" alt="logoJema" loading="lazy" /></RouterLink>
      </div>

      <ul class="nav_menu" role="menubar">
        <li class="nav_item">
          <RouterLink to="/" class="nav_link" active-class="active" @click="cerrarMenu" @keydown.enter="cerrarMenu"
            @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de inicio"
            :aria-current="$route.path === '/' ? 'page' : undefined">
            <div class="container-img-nav">
              <img :src="InicioIcon" alt="Inicio" loading="lazy" />
            </div>
            <p>Inicio</p>
          </RouterLink>
        </li>

        <li class="nav_item">
          <RouterLink to="/joyas-jema" class="nav_link" active-class="active" @click="cerrarMenu"
            @keydown.enter="cerrarMenu" @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de Joyas Jema"
            :aria-current="$route.path === '/joyas-jema' ? 'page' : undefined">
            <div class="container-img-nav">
              <img :src="JoyasIcon" alt="Joyas" loading="lazy" />
            </div>
            <p>Nuestras Joyas</p>
          </RouterLink>
        </li>

        <li class="nav_item">
          <RouterLink to="/contacto" class="nav_link" active-class="active" @click="cerrarMenu"
            @keydown.enter="cerrarMenu" @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de Contactame"
            :aria-current="$route.path === '/contacto' ? 'page' : undefined">
            <div class="container-img-nav">
              <img :src="SobreMi" alt="Icono Sobre Mi" loading="lazy" />
            </div>
            <p>Contactame</p>
          </RouterLink>
        </li>

      </ul>
    </section>

  </nav>
</template>

<style scoped>
.navbar {
  opacity: 1;
  padding-block: 0.5rem;
  background-color: rgba(255, 255, 255, 1);
  will-change: transform, padding, backdrop-filter, box-shadow;
  transition: opacity 0.3s ease, padding 0.3s ease, backdrop-filter 0.3s ease, background-color 0.3s ease;
}

.navbar.transparent {
  padding-block: 0.2rem;
  opacity: 0.95;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1100px;
  padding-inline: 0.5rem;
  margin-inline: auto;
}

.logo_container {
  inline-size: 120px;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }

  & img {
    inline-size: 100%;
    block-size: 100%;
  }
}

.nav_menu {
  list-style: none;
  display: flex;
  column-gap: 2.5rem;
}

.nav_item {
  animation: slideInLeft 0.3s ease-out;
  animation-fill-mode: both;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }
}

.nav_link {
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  &:focus {
    outline: 2px solid var(--naranja);
    outline-offset: 2px;
  }

  &:focus-visible {
    background: var(--azul-claro);
    color: var(--blanco);
  }

  &.active {
    transform: translateY(-2px);
    border-bottom: 3px solid var(--azul-principal);
  }

  &:hover {
    transform: translateY(-2px);
    border-bottom: 3px solid var(--azul-principal-50);
  }
}

.container-img-nav {
  width: 25px;
  height: 25px;
  overflow: hidden;

  &>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

p {
  color: var(--azul-principal);
  font-size: 1.05em;
  font-family: var(--fuente-titulo);
}


@media screen and (max-width: 767px) {
  .nav_container {
    flex-direction: column;
    justify-content: start;
    height: 100dvh;
    padding: 0;

    .logo_container {
      width: 100%;
      margin-inline: auto;
      padding: 0.5rem;
      border: none;
    }

    .nav_menu {
      flex-direction: column;
      width: 100%;
      padding: 0.5rem;

      &>.nav_item {
        animation: slideInLeft 0.3s ease-out;
        animation-fill-mode: both;

        &:nth-child(1) {
          animation-delay: 0.1s;
        }

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.3s;
        }
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav_link {
    transition: none;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav_link {
    transition: none;
  }

  .nav_item {
    animation: none;
  }

  .logo_container:hover {
    transform: none;
  }
}
</style>

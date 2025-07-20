<script>
import logoJema from '@/assets/img/Jema.png'
import InicioIcon from '@/assets/img/inicio.png'
import JoyasIcon from '@/assets/img/joyas.png'
import SobreMi from '@/assets/img/sobre-mi.png'

export default {
  name: 'NavbarComponent',

  data() {
    return {
      logoJema,
      InicioIcon,
      JoyasIcon,
      SobreMi,
      mostrarMenu: false
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
  },

  mounted() {
    const img = new Image();
    img.src = this.logoJema;
  }
}
</script>

<template>
  <nav class="nav_container" role="navigation" aria-label="Navegacion Principal">
    <div class="logo_container">
      <RouterLink to="/"><img :src="logoJema" alt="logoJema" loading="lazy" /></RouterLink>
    </div>
    <ul class="nav_menu" role="menubar">
      <li class="nav_item">
        <RouterLink to="/" class="nav_link" active-class="active" @click="cerrarMenu" @keydown.enter="cerrarMenu"
          @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de inicio"
          :aria-current="$route.path === '/' ? 'page' : undefined">
          <img :src="InicioIcon" alt="Inicio" loading="lazy" />
          Inicio
        </RouterLink>
      </li>
      <li class="nav_item">
        <RouterLink to="/joyas-jema" class="nav_link" active-class="active" @click="cerrarMenu"
          @keydown.enter="cerrarMenu" @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de Joyas Jema"
          :aria-current="$route.path === '/joyas-jema' ? 'page' : undefined">
          <img :src="JoyasIcon" alt="Joyas" loading="lazy" />
          Nuestras Joyas
        </RouterLink>
      </li>
      <li class="nav_item">
        <RouterLink to="/contacto" class="nav_link" active-class="active" @click="cerrarMenu"
          @keydown.enter="cerrarMenu" @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de Contactame"
          :aria-current="$route.path === '/contacto' ? 'page' : undefined">
          <img :src="SobreMi" alt="Icono Sobre Mi" loading="lazy" />
          Contactame
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav_container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  &>.logo_container {
    inline-size: 200px;
    border-block-end: 2px solid var(--verde-50);
    padding-block-end: 0.5rem;

    &:hover {
      transform: scale(1.02);
      transition: transform 0.2s ease;
    }

    &:focus-within {
      outline: 2px solid var(--naranja);
      outline-offset: 2px;
      border-radius: 0.5rem;
    }

    & img {
      inline-size: 100%;
      block-size: 100%;
      object-fit: contain;
    }
  }

  &>.nav_menu {
    list-style: none;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    inline-size: 100%;

    &>.nav_item {
      font-family: var(--fuente-titulo);
      inline-size: 100%;
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

      &>.nav_link {
        gap: 0.5rem;
        display: flex;
        align-items: center;
        color: var(--azul-principal);
        text-decoration: none;
        font-size: 1.2em;
        padding: 0.5rem;
        border-radius: 0.3rem;
        line-height: 1.4;
        transition: background 0.2s ease, color 0.2s ease;

        &:focus {
          outline: 2px solid var(--naranja);
          outline-offset: 2px;
        }

        &:focus-visible {
          background: var(--azul-claro);
          color: var(--blanco);
        }

        &.active {
          background: var(--azul-oscuro-50);
          color: var(--blanco);
          font-weight: bold;
          transform: translateX(2px);
        }

        &:hover {
          background: var(--azul-claro);
          color: var(--blanco);
          transform: translateX(5px);
        }

        &>img {
          inline-size: 25px;
        }
      }
    }

  }
}

@media screen and (max-width: 767px) {
  .nav_container {
    padding: 0;

    .logo_container {
      width: 100%;
      margin-inline: auto;
      padding: 0.5rem;
      border: none;
    }

    .nav_menu {
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

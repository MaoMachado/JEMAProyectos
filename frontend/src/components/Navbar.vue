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
      // this.isScrolled = window.scrollY > 80

      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.isScrolled = window.scrollY > 50
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
  <nav :class="['navbar', { scrolled: isScrolled }]" role="navigation" aria-label="Navegacion Principal">

    <div class="top-accent-line"></div>

    <section class="navbar-container" ref="heroSection">
      <div class="logo_container">
        <RouterLink to="/" class="logo-link">
          <img class="logo-img" :src="logoJema" alt="logoJema" loading="lazy" />
          <div class="logo-shine"></div>
        </RouterLink>
      </div>

      <ul class="nav_menu" role="menubar">
        <li class="nav_item">
          <RouterLink to="/" class="nav_link" active-class="active" @click="cerrarMenu" @keydown.enter="cerrarMenu"
            @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de inicio"
            :aria-current="$route.path === '/' ? 'page' : undefined">
            <div class="nav-link-content">
              <div class="icon-wrapper">
                <img :src="InicioIcon" alt="Inicio" loading="lazy" />
              </div>
              <span class="nav-text">Inicio</span>
              <span class="nav-underline"></span>
            </div>
          </RouterLink>
        </li>

        <li class="nav_item">
          <RouterLink to="/joyas-jema" class="nav_link" active-class="active" @click="cerrarMenu"
            @keydown.enter="cerrarMenu" @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de Joyas Jema"
            :aria-current="$route.path === '/joyas-jema' ? 'page' : undefined">
            <div class="nav-link-content">
              <div class="icon-wrapper">
                <img :src="JoyasIcon" alt="Joyas" loading="lazy" />
              </div>
              <span class="nav-text">Proyectos</span>
              <span class="nav-underline"></span>
            </div>
          </RouterLink>
        </li>

        <li class="nav_item">
          <RouterLink to="/contacto" class="nav_link" active-class="active" @click="cerrarMenu"
            @keydown.enter="cerrarMenu" @keydown.space="cerrarMenu" role="menuitem" aria-label="Pagina de Contactame"
            :aria-current="$route.path === '/contacto' ? 'page' : undefined">
            <div class="nav-link-content">
              <div class="icon-wrapper">
                <img :src="SobreMi" alt="Icono Sobre Mi" loading="lazy" />
              </div>
              <span class="nav-text">Contacto</span>
              <span class="nav-underline"></span>
            </div>
          </RouterLink>
        </li>

        <li class="nav_item nav-cta">
          <RouterLink to="/cotizacion" class="cta-button">
            <span>Iniciar Proyecto</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </li>

      </ul>
    </section>

  </nav>
</template>

<style scoped>
.navbar {
  --nav-height: 80px;
  --transition-speed: 0.3s;
  --border-radius: 12px;

  position: relative;
  height: var(--nav-height);
  background: linear-gradient(135deg, var(--blanco) 0%, var(--azul-suave) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(30, 73, 113, 0.1);
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);

  opacity: 1;
  padding-block: 0.5rem;
  will-change: transform, padding, backdrop-filter, box-shadow;
}

.top-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
      var(--azul-principal) 0%,
      var(--naranja) 50%,
      var(--azul-claro) 100%);
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.navbar.scrolled {
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(30, 73, 113, 0.15);
}

.navbar.scrolled .navbar-container {
  padding-block: 0.75rem;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding-block: 1rem;
  transition: padding var(--transition-speed) ease;
}

.logo_container {
  position: relative;
  height: 50px;
  z-index: 10;
}

.logo-link {
  position: relative;
  display: inline-block;
  height: 100%;
  transition: transform var(--transition-speed) ease;
}

.logo-link:hover {
  transform: translateY(-2px) scale(1.05);
}

.logo-img {
  height: 100%;
  width: auto;
  filter: drop-shadow(0 2px 4px rgba(30, 73, 113, 0.1));
}

.logo-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent);
  transition: left 0.5s ease;
}

.logo-link:hover .logo-shine {
  left: 100%;
}

.nav_menu {
  display: flex;
  align-items: center;
  column-gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav_item {
  position: relative;
  animation: slideInTop 0.5s ease-out;
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

  &:nth-child(4) {
    animation-delay: 0.4s;
  }
}

.nav_link {
  display: block;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
}

.nav-link-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--azul-suave);
  border-radius: 8px;
  padding: 4px;
  transition: all var(--transition-speed) ease;
}

.icon-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(1037%) hue-rotate(185deg) brightness(92%) contrast(90%);
}

.nav-text {
  font-family: var(--fuente-titulo);
  font-size: 1em;
  font-weight: 500;
  color: var(--azul-principal);
  transition: all var(--transition-speed) ease;
}

.nav-underline {
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--naranja);
  transform: translateX(-50%);
  transition: width var(--transition-speed) ease;
}

.nav_link:hover .icon-wrapper {
  background: var(--azul-principal);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--azul-principal-50);
}

.nav_link:hover .icon-wrapper img {
  filter: brightness(0) invert(1);
}

.nav_link:hover .nav-underline {
  width: 100%;
}

/* Estado activo */
.nav_link.active {
  background: linear-gradient(135deg, var(--azul-suave) 0%, var(--azul-suave-50) 100%);
}

.nav_link.active .icon-wrapper {
  background: var(--azul-principal);
  box-shadow: 0 2px 8px var(--azul-principal-50);
}

.nav_link.active .icon-wrapper img {
  filter: brightness(0) invert(1);
}

.nav_link.active .nav-text {
  color: var(--azul-oscuro);
  font-weight: 600;
}

.nav-cta {
  margin-left: 1rem;
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--naranja) 0%, #ff8a65 100%);
  color: var(--blanco);
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all var(--transition-speed) ease;
  box-shadow: 0 4px 15px var(--naranja-50);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent);
  transition: left 0.5s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--naranja-50);
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button svg {
  transition: transform var(--transition-speed) ease;
}

.cta-button:hover svg {
  transform: translateX(4px);
}

/* Focus states para accesibilidad */
.nav_link:focus-visible,
.cta-button:focus-visible {
  outline: 3px solid var(--azul-claro);
  outline-offset: 2px;
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* Responsive Design */
@media screen and (max-width: 1024px) {
  .navbar-container {
    width: 95%;
  }

  .nav_menu {
    gap: 1rem;
  }

  .nav-text {
    font-size: 0.95rem;
  }
}

@media screen and (max-width: 767px) {
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background: linear-gradient(180deg, var(--azul-suave) 0%, var(--blanco) 100%);
    border-radius: 0 1rem 1rem 0;
    box-shadow: 4px 0 30px rgba(30, 73, 113, 0.2);
  }

  .top-accent-line {
    width: 3px;
    height: 100%;
    right: auto;
    background: linear-gradient(180deg,
        var(--azul-principal) 0%,
        var(--naranja) 50%,
        var(--azul-claro) 100%);
  }

  .navbar-container {
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem 1.5rem;
    gap: 3rem;
    width: 100%;
  }

  .logo_container {
    height: 60px;
  }

  .nav_menu {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .nav_item {
    width: 100%;
  }

  .nav_link {
    padding: 1rem;
    border-radius: var(--border-radius);
  }

  .nav-link-content {
    justify-content: flex-start;
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
    padding: 6px;
  }

  .nav-text {
    font-size: 1.1rem;
  }

  .nav-cta {
    margin-left: 0;
    margin-top: 2rem;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
    padding: 1rem;
    font-size: 1rem;
  }
}

/* Reducción de movimiento para accesibilidad */
@media (prefers-reduced-motion: reduce) {

  .navbar,
  .nav_link,
  .cta-button,
  .logo-link,
  .icon-wrapper,
  .nav-underline {
    transition: none;
  }

  .nav_item {
    animation: none;
  }

  .top-accent-line {
    animation: none;
  }
}
</style>

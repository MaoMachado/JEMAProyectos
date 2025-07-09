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

  methods:{
    cerrarMenu(){
      this.$emit('cerrar-menu')
    }
  },
}
</script>

<template>
  <nav class="nav_container">
    <div class="logo_container">
      <RouterLink to="/"><img :src="logoJema" alt="logoJema" /></RouterLink>
    </div>
    <ul class="nav_menu">
      <li class="nav_item">
        <RouterLink to="/" class="nav_link" active-class="active" @click="cerrarMenu">
          <img :src="InicioIcon" alt="Inicio" />
          Inicio
        </RouterLink>
      </li>
      <li class="nav_item">
        <RouterLink to="/joyas-jema" class="nav_link" active-class="active" @click="cerrarMenu">
          <img :src="JoyasIcon" alt="Joyas" />
          Nuestras Joyas
        </RouterLink>
      </li>
      <li class="nav_item">
        <RouterLink to="/contacto" class="nav_link" active-class="active" @click="cerrarMenu">
          <img :src="SobreMi" alt="Icono Sobre Mi">
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

  &>.menu_mobil {
    display: none;
  }

  &>.logo_container {
    inline-size: 200px;
    border-block-end: 2px solid var(--verde-50);
    padding-block-end: 0.5rem;

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

      &>.nav_link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--azul-principal);
        text-decoration: none;
        font-size: 1.2em;
        padding: 0.5rem;
        border-radius: 0.3rem;
        transition: background 0.2s ease, color 0.2s ease;

        &.active {
          background: var(--azul-oscuro-50);
          color: var(--blanco);
        }

        &:hover {
          background: var(--azul-claro);
          color: var(--blanco);
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
    }
  }
}
</style>

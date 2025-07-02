<script>
import NavbarComponent from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
  },
}
</script>

<template>
  <div class="app_container">
    <header class="nav_principal_container">
      <NavbarComponent />
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
</style>

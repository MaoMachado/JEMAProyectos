<script>
import NavbarComponent from './components/Navbar.vue';

export default {
  name: 'App',

  components: {
    NavbarComponent,
  }
}
</script>

<template>
  <div class="app_container">
    <header>
      <NavbarComponent />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app_container {
  display: flex;
  inline-size: 100dvw;
  block-size: 100dvh;
  background-color: var(--gris-claro);

  header {
    inline-size: 250px;
    block-size: 100%;
  }

  main {
    flex: 1;
  }
}
</style>

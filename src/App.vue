<script setup>
import FooterJema from './components/FooterJema.vue';
import HeaderJema from './components/HeaderJema.vue';
import ToastGlobal from './components/ToastGlobal.vue';
</script>

<template>
  <HeaderJema />
  <main>
    <ToastGlobal />
    <router-view />
  </main>
  <FooterJema />
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  margin-bottom: 1rem;
}
</style>

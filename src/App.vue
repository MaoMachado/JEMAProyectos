<script setup>
import FloatingButtons from './components/FloatingButtons.vue';
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
  <FloatingButtons />
  <FooterJema />
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
</style>

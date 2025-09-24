<script setup>
import FooterJema from './components/FooterJema.vue';
import HeaderJema from './components/HeaderJema.vue';
import HeroJema from './views/HeroJema.vue';
import JoyasJema from './views/JoyasJema.vue';
import QueHacemos from './views/QueHacemosJema.vue';
</script>

<template>
  <HeaderJema />
  <main>
    <HeroJema />
    <QueHacemos />
    <JoyasJema />
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

<script>
export default {
  name: 'NotFound',

  data() {
    return {
      titulo: 'Pagina no encontrada'
    }
  }
}
</script>

<template>
  <main role="main" aria-label="Pagina no encontrada" aria-labelledby="not-found-title">
    <h1 id="not-fount-title">{{ titulo }}</h1>
  </main>
</template>

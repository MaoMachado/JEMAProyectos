<script>
export default {
  name: "FooterContainer",

  setup() {
    const title = "JemaProyectos"
    const parrafo = "Construimos tu visión"

    return {
      title,
      parrafo
    }
  }
}
</script>

<template>
  <footer aria-labelledby="header-title">
    <div class="footer-container">
      <header class="footer-header">
        <h2 id="header-title" class="header-title">{{ title }}</h2>
        <p class="header-texto">{{ parrafo }}</p>
      </header>

      <section class="footer-navList" aria-labelledby="navList-title">
        <h3 id="navList-title" class="navList-title">Menú</h3>
        <ul class="navList-container" role="navigation">
          <li class="item"><a href="#" class="item-link">Inicio</a></li>
          <li class="item"><a href="#" class="item-link">Nuestras Joyas</a></li>
          <li class="item"><a href="#" class="item-link">Contactame</a></li>
        </ul>
      </section>

      <section class="foote-info">
        <h3 class="info-title">Contacto</h3>
        <p class="info-texto">Jeison Machado - Ingeniero Civil 👷</p>
        <p class="info-texto">✉️ jemaproyecto@jema.com</p>
        <p class="info-texto">📲 +57 300123456789</p>
        <div class="info-list">
          <a href="#" class="info-link">WhatsApp</a>
          <a href="#" class="info-link">Instagram</a>
          <a href="#" class="info-link">Facebook</a>
        </div>
      </section>

      <article class="footer-derechos">
        <p class="texto-derechos">© 2025 JemaProyectos. Todos los derechos reservados.</p>
        <p class="subTexto-derechos">Desarrollado por <span>MaoMachado</span></p>
      </article>
    </div>
  </footer>
</template>

<style scoped>
footer {
  min-height: 80px;
  padding: 0.5rem;
  background: rgb(0, 0, 0);
  padding-block: 2.5rem;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.5rem;
  width: 80%;
  margin-inline: auto;
}

/* Header */
.footer-header {
  place-content: center;

  &:hover .header-texto {
    transform: translateX(100px) scale(1.1);
  }
}

.header-title {
  margin: 0;
}

.header-texto {
  width: fit-content;
  transform: translateX(0);
  color: var(--blanco);
  transition: transform 0.2s linear;
}

/* Lista de navegación */
.footer-navList {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.navList-title {
  margin: 0;
  text-align: center;
}

.navList-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  list-style: none;
}

.item-link {
  text-decoration: none;
  color: var(--blanco-50);
  font-size: 1.1em;
  transition: all 0.1s linear;

  &:hover {
    color: var(--naranja);
    scale: 1.02;
    transform: translateX(5px);
  }
}

/* Info */
.foote-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-title {
  margin: 0;
}

.info-texto {
  color: var(--blanco);
}

.info-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.info-link {
  color: var(--blanco-50);
  text-decoration: none;
  transition: all 0.2s linear;

  &:hover {
    color: var(--naranja);
    transform: translateY(-2px) scale(1.1);
  }
}

/* Derechos */
.footer-derechos {
  grid-column: span 3;
  display: grid;
  place-content: center;
}

.texto-derechos {
  font-size: 0.8em;
}

.subTexto-derechos {
  font-size: 0.7em;
  text-align: center;

  &>span {
    font-size: 1.1em;
  }
}

.texto-derechos:hover,
.subTexto-derechos:hover {
  color: var(--blanco);
}

/* Responsive */
@media screen and (max-width: 768px) {
  footer {
    display: flex;
  }

  .footer-container{
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    align-items: center;
  }
}
</style>

<script setup>
import J from "@/assets/img/J.png"
const title = "¿Qué Hacemos?"
</script>

<template>
  <section class="proyectos font-sans" id="que-hacemos">
    <header class="proyectos-header">
      <h2>{{ title }}</h2>
      <img :src="J" alt="Logo de JemaProyectos" loading="lazy">
    </header>

    <article class="proyectos-article">
      <p>
        En <strong class="text-blue-500">Gema Inmobiliaria</strong> nos especializamos en <strong
          class="text-blue-500">captar propiedades con verdadero potencial</strong>. Nuestro equipo analiza a fondo cada
        inmueble evaluando:
      </p>

      <ul>
        <li>
          <strong class="text-blue-500">Valorización proyectada</strong> de la zona.
        </li>
        <li>
          <strong class="text-blue-500">Comportamiento de los arriendos</strong> en el sector.
        </li>
        <li>
          <strong class="text-blue-500">Avalúo comercial por metro cuadrado</strong> frente al mercado.
        </li>
      </ul>

      <p>
        De esta manera, garantizamos que cada propiedad que ofrecemos no sea solo un inmueble más, sino una
        <strong class="text-blue-500">inversión sólida y estratégica</strong> para nuestros clientes.
      </p>
    </article>


  </section>
</template>

<style scoped lang="scss">
.proyectos {
  display: grid;
  place-content: center;
  width: var(--width-1200);
  height: 100dvh;
  margin-inline: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    width: 400px;
    height: 400px;
    background: rgba(30, 64, 175, 0.2);
    position: absolute;
    transform: translateX(100%) translateY(100%);
    z-index: -1;
    border-radius: 50%;
    filter: blur(5px);
    box-shadow: 0 0 20px hsla(0, 0%, 80%, 0.3);
    opacity: 0.5;
  }

  & .proyectos-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    position: relative;

    &::before {
      content: "";
      width: 100px;
      height: 5px;
      background: linear-gradient(to right, rgba(59, 131, 246, 0.1), rgb(59, 130, 246));
      position: absolute;
      bottom: -1rem;
      border-radius: 1rem;
    }

    & h2 {
      font-size: 3em;
    }

    & img {
      width: 50px;
      height: 50px;
    }
  }

  & .proyectos-article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: clamp(300px, 80%, 1000px);
    margin-inline: auto;

    & p {
      font-size: 1.25em;
      font-weight: lighter;
      text-align: center;
    }

    & ul {
      text-align: center;
      font-size: 1.2em;
      font-weight: lighter;
    }
  }
}
</style>

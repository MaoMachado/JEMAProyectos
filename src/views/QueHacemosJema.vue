<script setup>
import J from "@/assets/img/J.png"
const title = "¿Qué Hacemos?"

const listDetails = [
  {
    id: "01",
    title: "Venta De Propiedad",
    description: "Encuentra la propiedad ideal para ti. Gestionamos la venta de inmuebles con asesoría confiable y acompañamiento en todo el proceso."
  },
  {
    id: "02",
    title: "Compra De Propiedad",
    description: "Te acompañamos en cada paso para que encuentres y compres la propiedad que siempre soñaste, con seguridad y confianza."
  },
  {
    id: "03",
    title: "Reformamos Tu Propiedad",
    description: "Transformamos tu espacio con diseños modernos y materiales de calidad, aumentando el valor y la comodidad de tu propiedad."
  },
  {
    id: "04",
    title: "Inversiones",
    description: "Descubre oportunidades seguras en el mercado inmobiliario para hacer crecer tu capital con asesoría especializada."
  }
]
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

    <article class="list-details">
      <div class="list-details-item" v-for="details in listDetails" :key="details.id">
        <header class="list-details-item-header">
          <span>{{ details.id }}</span>
          <h3>{{ details.title }}</h3>
        </header>
        <p>{{ details.description }}</p>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.proyectos {
  display: grid;
  place-content: center;
  width: var(--width-1200);
  min-height: 100dvh;
  margin-inline: auto;
  position: relative;

  &::before {
    content: "";
    width: 200px;
    height: 200px;
    background: rgba(30, 64, 175, 0.1);
    border-radius: 50%;
    filter: blur(5px);
    position: absolute;
    z-index: -1;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .proyectos-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;

    &::before {
      content: "";
      width: 100px;
      height: 5px;
      background: linear-gradient(to right, rgba(59, 131, 246, 0.1), rgb(59, 130, 246));
      position: absolute;
      bottom: -0.5rem;
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

.list-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  & .list-details-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 2px solid rgba(59, 131, 246, 0.2);
    border-radius: 10px;

    &:hover {
      box-shadow: 0 0 10px rgb(59, 130, 246);
    }

    & .list-details-item-header {

      & span {
        padding: 2.5px;
        background: rgba(59, 131, 246, 0.2);
        border-radius: 5px;
        opacity: 0.5;
        font-size: 0.8em;
        letter-spacing: 5px;
      }

      & h3 {
        font-size: 2em;
        line-height: 28px;
      }
    }

    p {
      font-weight: lighter;
      text-wrap: balance;
    }
  }
}
</style>

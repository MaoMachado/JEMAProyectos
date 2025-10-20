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
  <section class="que-hacemos" id="que-hacemos">
    <header class="que-hacemos-header">
      <h2>{{ title }}</h2>
      <figure>
        <img :src="J" alt="Logo de JemaProyectos" loading="lazy" />
      </figure>
    </header>

    <article class="que-hacemos-article">
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
.que-hacemos {
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  inline-size: var(--wide-1200);
  min-block-size: 100vh;
  margin-inline: auto;
  padding: 1rem;
  position: relative;

  &::before {
    content: "";
    width: 400px;
    height: 400px;
    background: linear-gradient(to bottom, var(--azul-claro-40), transparent 50%);
    border-radius: 100%;
    filter: blur(40px);
    position: absolute;
    z-index: -1;
    transform: translateX(-100%) translateY(100%);
    right: 0;
  }

  & .que-hacemos-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    position: relative;

    & h2 {
      font-size: clamp(1em, 5vw, 4em);
      font-weight: 400;
      position: relative;
      text-shadow: 0 0 20px var(--azul-claro-80);

      &::before {
        content: "";
        width: 100%;
        height: 5px;
        background: linear-gradient(to right, transparent, var(--azul-oscuro-40));
        position: absolute;
        bottom: 0;
        border-radius: 1rem;
      }
    }

    & figure {
      width: 70px;
      height: 70px;

      & img {
        width: 100%;
        height: 100%;
      }
    }

  }

  & .que-hacemos-article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: clamp(300px, 80%, 1000px);
    margin-inline: auto;

    & p,
    ul {
      font-size: clamp(1em, 5vw, 1.85em);
      font-weight: lighter;
      text-align: center;
      color: var(--color5);

      .dark & {
        color: white;
      }
    }
  }

  & .list-details {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    & .list-details-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      min-height: 250px;
      padding: 0.85rem;
      border: 2px solid rgba(59, 131, 246, 0.1);
      border-radius: 10px;

      &:hover {
        box-shadow: 0 0 5px rgba(59, 131, 246, 0.3), 0 0 10px rgba(59, 131, 246, 0.5), 0 0 15px rgba(59, 131, 246, 0.8);
        border-color: rgb(59, 130, 246);
      }

      &:hover .list-details-item-header span {
        opacity: 1;
      }

      & .list-details-item-header {

        & span {
          padding: 5px;
          background: rgba(59, 131, 246, 0.2);
          border-radius: 5px;
          opacity: 0.25;
          font-size: 0.75em;
          letter-spacing: 2.5px;
        }

        & h3 {
          font-size: clamp(1em, 5vw, 2em);
          text-align: center;
          font-weight: bold;
        }
      }

      p {
        font-weight: lighter;
        text-wrap: balance;
        text-align: center;
        font-size: clamp(1em, 5vw, 1.25em);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .que-hacemos {
    row-gap: 1rem;
    inline-size: 100dvw;
    min-block-size: 100dvh;
    padding: 1rem;
    margin-bottom: 0;

    &::before {
      width: 300px;
      height: 300px;
      transform: translateX(50%) translateY(0);
      right: 50%;
      top: 300px;
    }

    & .que-hacemos-header {
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;

      & h2 {
        font-size: clamp(2em, 8vw, 3em);
        font-weight: 500;
        text-shadow: 0 0 10px var(--azul-claro-80);
      }

      & figure {
        width: 10%;
        height: 10%;

        & img {
          width: 100%;
          height: 100%;
        }
      }
    }

    & .que-hacemos-article {
      width: 100%;
      padding: 0.5rem;

      & p,
      ul {
        text-align: justify;
        font-size: clamp(1em, 5vw, 1.35em);

        & li {
          text-align: center;
        }
      }
    }
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../../supabase.config';
import ModalJema from '@/components/ModalJema.vue';
import GaleriaJema from '@/components/GaleriaJema.vue';

import joyaImg from '@/assets/img/joya.png'
import iconWhatsapp from '@/assets/img/icons/whatsapp.svg'
import galleryImgs from '@/assets/img/icons/fotos.png'

const title = ref("Nuestras Joyas");
const showModal = ref(false);
const selectedJoya = ref(null)

const joyas = ref([]);
const loading = ref(true);
const errorMessage = ref(null);

const fetchCards = async () => {
  loading.value = true;

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    errorMessage.value = "Error cargando joyas";
    console.error(error);
  } else {
    joyas.value = data;
  }

  loading.value = false;
};

const openModal = (joya) => {
  selectedJoya.value = joya;
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
  selectedJoya.value = null;
};

onMounted(() => {
  fetchCards();
})
</script>

<template>
  <section class="joyas" id="joyas">
    <header class="joyas-header">
      <h2>{{ title }}</h2>
      <figure>
        <img :src="joyaImg" alt="Joyas de JemaProyectos" loading="lazy">
      </figure>
    </header>

    <article class="joyas-article">
      <div v-if="loading">
        <p>Cargando Joyas...</p>
      </div>

      <div class="joyas-not-found" v-else-if="joyas.length === 0">
        <p class="text-4xl font-light text-yellow-800 text-center">
          No Hay Joyas Disponibles
        </p>
      </div>

      <div class="joyas-item" v-for="joya in joyas" :key="joya.id">
        <figure title="Ver mas info en el icono de la imagen">
          <img class="joyas-img-portada" :src="joya.images?.[0] || portadaImg" alt="Portada de la casa"
            loading="lazy" />
          <figcaption>
            <span>{{ joya.barrio || "Sin Barrio" }}</span>
            <h3>{{ joya.title }}</h3>
            <p>{{ joya.description }}</p>
            <div class="joyas-btn">
              <a href="https://api.whatsapp.com/send?phone=573165124487" target="_blank" rel="noopener noreferrer">
                <img :src="iconWhatsapp" alt="" loading="lazy">
              </a>
              <button type="button" @click="openModal(joya)" aria-label="Abrir galería de imágenes">
                <img :src="galleryImgs" alt="" loading="lazy" />
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </article>

    <!-- Modal -->
    <ModalJema :show="showModal" :title="selectedJoya?.title" @close="closeModal">
      <template #content>
        <div class="modal-card-content p-5">
          <GaleriaJema v-if="selectedJoya?.images?.length" :images="selectedJoya.images" :interval="5000" />
          <div class="description-content">
            <p>{{ selectedJoya?.description }}</p>
          </div>
        </div>
      </template>
    </ModalJema>
  </section>
</template>

<style scoped lang="scss">
.joyas {
  display: flex;
  flex-direction: column;
  row-gap: 5rem;
  width: var(--wide-1200);
  min-height: 100dvh;
  margin-inline: auto;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 10%;
    left: 10%;
    width: 200px;
    height: 200px;
    background: linear-gradient(to right, transparent, rgba(25, 69, 139, 0.25));
    border-radius: 50%;
    z-index: -1;
    filter: blur(15px);
    animation: float 10s ease-in-out infinite alternate;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 10%;
    right: 10%;
    width: 200px;
    height: 200px;
    background: linear-gradient(to right, transparent, rgba(25, 69, 139, 0.25));
    border-radius: 50%;
    z-index: -1;
    filter: blur(15px);
    animation: float 10s ease-in-out infinite alternate;
  }

  & .joyas-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before {
      content: "";
      width: 475px;
      height: 5px;
      background: linear-gradient(to right, transparent, rgba(3, 13, 46, 0.25));
      position: absolute;
      bottom: 0;
      border-radius: 1rem;
    }

    & h2 {
      font-size: clamp(1em, 5vw, 4em);
      font-weight: lighter;
    }

    & figure {
      display: grid;
      place-content: center;
      width: 100px;
      height: 100px;

      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.joyas-article {

  & .joyas-not-found {
    & p {
      .dark & {
        color: white;
      }
    }
  }

  & .joyas-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    overflow: hidden;

    & figure {
      width: 300px;
      position: relative;
      cursor: context-menu;

      &:hover .joyas-img-portada {
        transform: scale(1.02);
      }

      & img {
        width: 100%;
        border-radius: 5px;
        transition: transform 0.1s linear;
      }

      & figcaption {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        transition: transform 0.1s linear;

        & span {
          color: rgba(3, 13, 46, 0.4);
          font-size: 1.05em;
          font-weight: bold;
          text-align: right;

          .dark & {
            color: #ccc; // Dark mode
          }
        }

        & h3 {
          font-size: clamp(1em, 5vw, 2em);
          text-align: center;
          font-weight: 400;
        }

        & p {
          color: rgb(3, 13, 46);
          text-align: center;

          .dark & {
            color: #ccc; // Dark mode
          }
        }

        & .joyas-btn {
          display: flex;
          justify-content: flex-end;

          & a,
          img {
            width: 40px;
            height: 40px;
            cursor: pointer;
            filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
          }
        }

      }
    }
  }
}

.modal-card-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: clamp(300px, 100%, 500px);

  & .description-content {

    & p {
      text-align: center;
    }
  }
}

@keyframes float {
  from {
    transform: translate(0, 0) scale(1);
  }

  to {
    transform: translate(20px, -30px) scale(1.1);
  }
}

@media screen and (max-width: 768px) {
  .joyas {
    inline-size: 100%;
    block-size: 100dvh;
    place-content: center;
    gap: 1rem;

    & .joyas-header {
      flex-wrap: wrap;

      & h2 {
        font-size: clamp(2em, 8vw, 3em);
        font-weight: 500;
        text-shadow: 0 0 10px var(--azul-claro-80);
      }

      & figure {
        width: 100px;
        height: 100px;

        & img {
          width: 100%;
          height: 100%;
        }
      }
    }

    & .joyas-article {

      & .joyas-item {
        flex-direction: row;

        & figure {
          padding: 0.5rem;
          background: var(--azul-claro-20);
          border-radius: 0.5rem;
          border: 2px solid var(--azul-claro-40);

          & figcaption{
            gap: 0;

            & span{
              color: var(--azul-claro-80);
            }

            & h3{
              font-size: 1.5em;
              margin-bottom: 1rem;
            }

            & p{
              margin-bottom: 2rem;
            }
          }
        }
      }
    }

    & .modal-card-content{
      margin-inline: auto;
      padding: 0;
      gap: 0.5rem;

      & p{
        font-size: clamp(1.25em, 3vw, 2.5em);
      }
    }
  }
}
</style>

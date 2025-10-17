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
        <div class="modal-card-content">
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
  place-content: center;
  row-gap: 1rem;
  inline-size: var(--wide-1200);
  min-block-size: 100vh;
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
      width: 100px;
      height: 100px;

      & img {
        width: 100%;
        height: 100%;
      }
    }
  }

  & .joyas-article {

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
      border-radius: 1rem;
      overflow: hidden;

      & figure {
        width: 320px;
        padding: 0.85rem;
        position: relative;
        cursor: context-menu;
        box-shadow: 0 4px 12px var(--azul-oscuro-40);
        border-radius: 1rem;

        &:hover .joyas-img-portada {
          transform: scale(1.02);
        }

        & img {
          width: 100%;
          transition: transform 0.1s linear;
        }

        & figcaption {
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
          transition: transform 0.1s linear;

          & span {
            color: var(--azul-claro);
            font-size: 1.05em;
            font-weight: lighter;
            text-align: right;
            text-shadow: 0 0 20px var(--blanco);
          }

          & h3 {
            font-size: 1.85em;
            text-align: center;
            line-height: 2rem;
            font-weight: 500;
          }

          & p {
            text-align: center;
            font-weight: lighter;
            font-size: 1.25em;
          }

          & .joyas-btn {
            display: flex;
            justify-content: flex-end;
            margin-block-start: 1.25rem;

            & a,
            img {
              width: 40px;
              height: 40px;
              cursor: pointer;
            }
          }

        }
      }
    }
  }

  & .modal-card-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 500px;

    & .description-content {

      & p {
        text-align: center;
        font-size: 1.25em;
        font-weight: lighter;
      }
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

          & figcaption {
            gap: 0;

            & span {
              color: var(--azul-claro-80);
            }

            & h3 {
              font-size: 1.5em;
              margin-bottom: 1rem;
            }

            & p {
              margin-bottom: 2rem;
            }
          }
        }
      }
    }

    & .modal-card-content {
      margin-inline: auto;
      padding: 0;
      gap: 0.5rem;

      & p {
        font-size: clamp(1.25em, 3vw, 2.5em);
      }
    }
  }
}
</style>

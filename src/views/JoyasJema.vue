<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../../supabase.config';
import ModalJema from '@/components/ModalJema.vue';
import GaleriaJema from '@/components/GaleriaJema.vue';

import joyaImg from '@/assets/img/joya.png'
import portadaImg from '@/assets/img/fotosFloresta/img_5.jpg'

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
  <section class="joyas font-sans" id="joyas">
    <header class="joyas-header">
      <img :src="joyaImg" alt="Joyas de JemaProyectos" loading="lazy">
      <h2>{{ title }}</h2>
    </header>

    <article class="joyas-article">
      <div v-if="loading">
        <p>Cargando Joyas...</p>
      </div>

      <div v-else-if="joyas.length === 0" class="flex place-content-center">
        <p class="w-fit text-center text-2xl font-sans bg-blue-900/50 p-2 text-white rounded-xl">
          No hay joyas disponibles
        </p>
      </div>

      <div class="joyas-item" v-for="joya in joyas" :key="joya.id">
        <figure @click="openModal(joya)">
          <img :src="joya.images?.[0] || portadaImg" alt="Portada de la casa" loading="lazy" />
          <figcaption class="">
            <span>{{ joya.barrio || "Sin Barrio" }}</span>
            <h3>{{ joya.title }}</h3>
            <p>{{ joya.description }}</p>
          </figcaption>
        </figure>
      </div>
    </article>

    <!-- Modal -->
    <ModalJema :show="showModal" :title="selectedJoya?.title" @close="closeModal">
      <template #content>
        <div class="modal-card-content p-5">
          <GaleriaJema v-if="selectedJoya?.images?.length" :images="selectedJoya.images" :interval="4000" />
          <div class="description-content">
            <p class="font-bolder text-xl font-sans text-center text-white">{{ selectedJoya?.description }}</p>
          </div>
        </div>
      </template>
    </ModalJema>
  </section>
</template>

<style scoped lang="scss">
.joyas {
  width: var(--width-1200);
  min-height: 100dvh;
  margin-inline: auto;
  padding-inline: 1rem;
  position: relative;
  background: linear-gradient(to bottom, rgba(59, 131, 246, 0.2), rgba(59, 131, 246, 0.1), transparent 75%);
  border-radius: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 20%;
    /* transform: translateY(50%); */
    width: 200px;
    height: 200px;
    background: linear-gradient(to right, transparent, rgba(25, 69, 139, 0.25));
    border-radius: 50%;
    z-index: -1;
    filter: blur(10px);
  }

  & .joyas-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &::before {
      content: "";
      width: 300px;
      height: 5px;
      background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.25));
      position: absolute;
      border-radius: 1rem;
      bottom: 2rem;
    }

    & img {
      width: 200px;
      height: 200px;
    }

    & h2 {
      font-size: clamp(1em, 5vw, 3.5em);
      transform: translateY(-60px);
    }
  }
}

.joyas-article {

  & .joyas-item {
    display: flex;
    justify-content: center;

    & figure {
      width: 300px;
      border-radius: 1rem 1rem 0 0;
      position: relative;
      cursor: pointer;
      transition: background 0.1s linear;

      &:hover {
        background: linear-gradient(to bottom, rgba(59, 131, 246, 0.2), transparent 100%);
      }

      &:hover img {
        transform: translateY(-5px);
      }

      & img {
        width: 100%;
        border-radius: 1rem;
        margin-bottom: 1rem;
        transition: transform 0.1s linear;
      }

      & figcaption {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        transition: transform 0.1s linear;

        &:hover {
          transform: translateX(0.5rem);
        }

        & span {
          font-size: 1.25em;
          letter-spacing: 5px;
          color: #333;
          opacity: 0.5;

          .dark & {
            color: #ccc; // Dark mode
          }
        }

        & h3 {
          font-size: 1.5em;
        }

        & p {
          font-weight: lighter;
          text-wrap: balance;
          color: #333;

          .dark & {
            color: #ccc; // Dark mode
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
  width: var(--width-1200);

  & img {
    width: 50%;
    margin-top: 0 !important;
  }

  & .description-content {
    width: 450px;
  }
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink, useRouter } from "vue-router";
import { supabase } from '../../supabase.config';
import { toggleTheme } from "@/utils/theme";
import { useToastStore } from '@/utils/toastStore';
import Jema from "@/assets/img/Jema.png"

const router = useRouter();
const isLoggedIn = ref(false);
const toast = useToastStore();
const isMobile = ref(false);

const emit = defineEmits(["close"]);

const handleLinkClick = () => {
  if (isMobile.value) emit("close");
};

function updateViewport() {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
}

const handleLogout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("jema_user");
  toast.triggerToast("👋 Sesión cerrada correctamente", "info");
  isLoggedIn.value = false;
  router.push("/login");
};

onMounted(async () => {
  const localUser = JSON.parse(localStorage.getItem("jema_user"));
  if (localUser) {
    isLoggedIn.value = true;
    return;
  }

  // Revisamos sesión activa en Supabase
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    isLoggedIn.value = true;
  }

  updateViewport();
  window.addEventListener("resize", updateViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateViewport);
});
</script>

<template>
  <header>
    <button class="btn-close" @click="$emit('close')" aria-label="Botón Cerrar">
      <img src="@/assets/img/icons/cerrar.svg" />
    </button>

    <div class="header-icons">
      <a href="https://wa.me/573123456789" target="_blank" rel="noopener noreferrer" aria-label="Enlace hacia WhatsApp">
        <img src="@/assets/img/icons/whatsapp.svg" loading="lazy" />
      </a>

      <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Enlace hacia Facebook">
        <img src="@/assets/img/icons/facebook.svg" />
      </a>

      <button v-if="isLoggedIn" @click="handleLogout" class="btn-logout" aria-label="Cerrar Sesión">
        Cerrar sesión
      </button>
    </div>

    <RouterLink to="/" class="header-logo">
      <img class="w-full h-15" :src="Jema" alt="Logo de JemaProyectos" loading="lazy">
    </RouterLink>

    <section class="header-navbar">
      <nav class="header-container">
        <a href="#que-hacemos" @click="handleLinkClick">¿Qué Hacemos?</a>
        <a href="#joyas" @click="handleLinkClick">Joyas</a>
        <button class="btn-theme" @click="toggleTheme()" aria-label="Cambiar el tema"></button>
      </nav>
    </section>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--wide-1200);
  margin-inline: auto;
  padding-inline: 2.5rem;
  position: relative;
  z-index: 10;
  transform: translateY(20px);

  & .btn-close {
    display: none;
  }

  & .header-icons {
    display: flex;
    align-items: center;

    &:hover a {
      filter: blur(2px);
    }

    &:hover a:hover {
      filter: none;
    }

    & a {
      width: 40px;
      height: 40px;
      transition: filter 0.3s ease;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    & .btn-logout {
      padding: 3px 5px;
      border-radius: 5px;
      background: rgb(30, 63, 174);
      color: #fff;
      cursor: pointer;
    }
  }

  & .header-logo {
    height: 60px;
    transform: translateX(50px);

    & img {
      width: 100%;
      height: 100%;
    }
  }

  & .header-navbar {
    & .header-container {
      display: flex;
      align-items: center;
      gap: 1rem;

      & a {
        font-weight: 400;
        font-size: 1.35em;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 3.5px;
          transform: translateY(5px);
          border-radius: 1rem;
          background: linear-gradient(to right, var(--azul-claro-20), var(--azul-claro-40));
          transition: width 0.25s linear;
          box-shadow: 0 0 10px hsla(0, 0%, 80%, 0.2);
        }

        &:hover::before {
          width: 100%;
        }

        &:hover {
          color: var(--azul-claro);
          text-shadow: 0 0 10px hsla(0, 0%, 80%, 0.5);
        }
      }

      & .btn-theme {
        width: 35px;
        height: 35px;
        cursor: pointer;
        position: relative;

        &:hover::before {
          transform: scale(1.1);
        }

        &::before {
          content: "";
          position: absolute;
          left: -3px;
          top: 2px;
          width: 100%;
          height: 100%;
          background: url('@/assets/img/icons/img-oscuro.png') center no-repeat;
          background-size: contain;
          transition: transform 0.3s ease;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  header {
    flex-direction: column;
    justify-content: center;
    row-gap: 1rem;
    position: fixed;
    top: 5px;
    left: 5px;
    z-index: 100;
    inline-size: 40dvw;
    min-inline-size: 300px;
    min-block-size: 98dvh;
    background: var(--azul-light-40);
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;
    box-shadow: 0 0 20px var(--azul-light-60);
    transform: translateY(0);

    & .btn-close {
      display: inline-block;
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--azul-claro-40);
      border-radius: 50%;
      border: none;
      color: var(--blanco);
      padding: 0.25rem;
    }

    & .header-icons {
      display: none;
    }

    & .header-logo {
      height: 80px;
      transform: translateX(0);
      filter: drop-shadow(0 0 10px hsla(0, 0%, 100%, 0.5));
    }

    & .header-navbar {
      width: 100%;

      & .header-container {
        flex-direction: column;
        align-items: start;
        gap: 0.5rem;

        & a {
          padding-inline-start: 0.5rem;
          color: var(--blanco);
          font-size: 1.5em;
          border-radius: 5px 0 0 5px;
          border-inline-start: 5px solid hsla(0, 0%, 100%, 0.5);
          animation: slideIn 0.3s ease forwards;
        }

        & .btn-theme {
          display: none;
        }
      }
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
</style>

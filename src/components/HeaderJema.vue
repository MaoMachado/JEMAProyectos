<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from "vue-router";
import { supabase } from '../../supabase.config';
import { toggleTheme } from "@/utils/theme";
import { useToastStore } from '@/utils/toastStore';
import Jema from "@/assets/img/Jema.png"

const router = useRouter();
const isLoggedIn = ref(false);
const toast = useToastStore();

const handleLogout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("jema_user");
  toast.triggerToast("👋 Sesión cerrada correctamente", "info");
  isLoggedIn.value = false;
  router.push("/login");
};

onMounted(async () => {
  // Revisamos localStorage
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
});
</script>

<template>
  <header class="flex items-center justify-between w-[var(--width-1200)] mx-auto p-5">
    <div class="header-icons">
      <a href="https://wa.me/573123456789" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/img/icons/whatsapp.svg" alt="Whatsapp" />
      </a>

      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/img/icons/facebook.svg" alt="Facebook" />
      </a>

      <button v-if="isLoggedIn" @click="handleLogout" class="btn-logout">
        Cerrar sesión
      </button>
    </div>

    <RouterLink to="/" class="header-logo">
      <img class="w-full h-15" :src="Jema" alt="Logo de JemaProyectos" loading="lazy">
    </RouterLink>

    <section class="header-navbar">
      <nav class="header-container">
        <a href="#que-hacemos">¿Qué Hacemos?</a>
        <a href="#joyas">Joyas</a>
        <button class="btn-theme" @click="toggleTheme()"></button>
      </nav>
    </section>
  </header>
</template>

<style scoped lang="scss">
header {
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
    height: 50px;

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
        font-family: 'Poppins', sans-serif;
        font-weight: 100;
        font-size: 1.1em;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: var(--color1);
          bottom: -2px;
          left: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          border-radius: 2rem;
        }

        &:hover {
          color: var(--color5);
          transform: translateY(-1px);

          .dark & {
            color: var(--color2);
          }

          &::before {
            transform: scaleX(1);
          }
        }
      }

      & .btn-theme {
        width: 40px;
        height: 40px;
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
          background: url('@/assets/img/icons/dark-theme.svg');
          transition: transform 0.3s ease;
        }
      }
    }
  }
}
</style>

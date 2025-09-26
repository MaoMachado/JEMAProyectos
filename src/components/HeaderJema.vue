<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from "vue-router";
import { supabase } from '../../supabase.config';
import { toggleTheme } from "@/utils/theme";
import Jema from "@/assets/img/Jema.png"
import { useToastStore } from '@/utils/toastStore';

const router = useRouter();
const isLoggedIn = ref(false);
const toast = useToastStore();

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

const handleLogout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("jema_user");
  toast.triggerToast("👋 Sesión cerrada correctamente", "info");
  isLoggedIn.value = false;
  router.push("/login");
};

</script>

<template>
  <header class="flex items-center">

    <RouterLink to="/">
      <img class="w-full h-15" :src="Jema" alt="Logo de JemaProyectos" loading="lazy">
    </RouterLink>

    <section class="header-navbar flex-1 flex justify-end items-center gap-6">
      <div class="flex items-center">
        <button class="cursor-pointer" @click="toggleTheme()">
          <span class="text-4xl">🌓</span>
        </button>
        <a href="https://wa.me/573123456789" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/img/icons/facebook.svg" alt="Facebook">
        </a>

        <button v-if="isLoggedIn" @click="handleLogout"
          class="ml-4 px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
          Cerrar sesión
        </button>
      </div>
      <nav class="header-container font-sans font-normal text-lg">
        <a href="#que-hacemos">¿Qué Hacemos?</a>
        <a href="#joyas">Joyas</a>
      </nav>
    </section>

  </header>
</template>

<style scoped lang="scss">
header {
  width: var(--width-1200);
  margin: 0 auto;
  padding-block: 1rem;
}

.header-navbar {

  & .header-container {
    display: flex;
    justify-content: end;
    gap: 1rem;
    position: relative;

    & a {
      position: relative;
      transition: all 0.2s cubic-bezier(0.23, 1, 0.320, 1);

      &:hover::before {
        content: "";
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, transparent 20%, rgba(59, 131, 246, 0.25));
        position: absolute;
        left: 0;
        bottom: -5px;
        border-radius: 1rem;
      }

      &:hover {
        color: rgb(59, 130, 246);
        transform: translateY(-2.5px);
      }
    }
  }
}
</style>

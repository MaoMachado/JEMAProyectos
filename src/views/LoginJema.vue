<script setup>
import { ref } from 'vue';
import { supabase } from '../../supabase.config';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/utils/toastStore';

const email = ref('');
const password = ref('');
const errorMessage = ref(null);
const router = useRouter();
const toast = useToastStore();

const validateForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.value = "Por favor ingresa un correo válido.";
    return false;
  }

  if (password.value.length < 6) {
    errorMessage.value = "La contraseña debe tener al menos 6 caracteres.";
    return false;
  }

  return true;
}

const handleLogin = async () => {
  errorMessage.value = null;

  if (!validateForm()) return;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMessage.value = "Correo O Contraseña Incorrectos"
    console.error(error.message);
    return;
  }

  toast.triggerToast("✅ Sesión iniciada con éxito", "success");

  // Guardar en localStorage
  localStorage.setItem("jema_user", JSON.stringify(data.session.user));

  setTimeout(() => {
    router.push("/admin"); // Redirigir después de mostrar el toast
  }, 1500);
}
</script>

<template>
  <section class="w-full min-h-[70vh] grid place-content-center">
    <div class="login-container">
      <h2 class="font-sans font-bold text-3xl text-center">Inicia La Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-container">
          <label for="email">👷</label>
          <input v-model="email" type="email" id="email" placeholder="Correo Electronico" required>
        </div>
        <div class="input-container">
          <label for="password">#️⃣</label>
          <input v-model="password" type="password" id="password" placeholder="Contraseña" required>
        </div>
        <button class="btn-primary" type="submit">Iniciar Sesión</button>
      </form>
      <p v-if="errorMessage" class="text-center text-red-500 font-bold text-xl">{{ errorMessage }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  & form {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    width: fit-content;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -110%;
      width: 100%;
      height: 50px;
      background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.2));
      border-radius: 200px;
      z-index: -1;
      filter: blur(10px);
    }

    & input {
      border: 1px solid rgba(59, 131, 246, 0.5);
      border-radius: 1rem;
      padding: 0.5rem;
      transition: border-color 0.2s ease-in-out;

      &:focus {
        outline: none;
        border-color: rgb(3, 13, 46);
      }

      .dark & {
        border-color: rgba(255, 255, 255, 0.5);
      }
    }

    & label {
      font-size: 2.2rem;
    }

    & .btn-primary {
      padding: 0.5rem 1rem;
      border: 1px solid rgba(59, 131, 246, 0.5);
      border-radius: 1rem;
      cursor: pointer;
      font-weight: 500;
      font-size: 1.1rem;

      &:hover {
        background-color: rgba(59, 131, 246, 0.5);
      }
    }

    & .input-container {
      display: flex;
      align-items: center;
    }
  }
}
</style>

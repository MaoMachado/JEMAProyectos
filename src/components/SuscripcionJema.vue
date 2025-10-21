<script setup>
import { ref } from 'vue';
import { supabase } from '../../supabase.config';

const email = ref('');
const message = ref('');

const handleSubmit = async () => {
  if (!email.value) return (message.value = "Por favor ingresa un correo valido");

  const { error } = await supabase.from("suscriptores").insert([{ email: email.value }]);

  if (error) {
    if (error.message.includes("duplicate")) {
      message.value = "Ya estas suscrito 👌";
    } else {
      console.error(error);
      message.value = "Ocurrió un error al suscribirte ❌";
    }
  } else {
    message.value = "¡Gracias por suscribirte!";
    email.value = "";
  }
}
</script>

<template>
  <section>
    <h3>¡Suscríbete a nuestro boletín!</h3>
    <form @submit.prevent="handleSubmit">
      <input type="email" name="email" id="email" v-model="email" placeholder="Ingres tu correo" required>
      <button type="submit">Suscribirme</button>
      <p>{{ message }}</p>
    </form>
  </section>
</template>

<style scoped lang="scss">
section{

  & h3{
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 0.5rem;
  }

  & form{
    display: flex;
    gap: 0.5rem;

    & input{
      padding: 0.5rem 0.85rem;
      border: 2px solid var(--azul-claro-20);
      border-radius: 0.5rem;
      font-size: 1em;

      &:focus{
        outline: none;
        border-color: var(--azul-claro-80);
      }
    }

    & button{
      background: var(--azul-claro-60);
      color: var(--blanco);
      padding: 0.5rem 0.85rem;
      border-radius: 0.5rem;

      &:hover{
        background: var(--azul-claro-80);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  section{

    & form{
      flex-direction: column;
    }
  }
}
</style>
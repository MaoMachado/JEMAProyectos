<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../../supabase.config';
import ModalJema from '@/components/ModalJema.vue';

const datos = ref({
  title: "GEMA INMOBILIARIA",
  subtitle: "Desde aca administra tu información de la pagina"
});

const newCard = ref({
  barrio: "",
  title: "",
  description: "",
  images: []
});

const isEditing = ref(false);
const selectedCard = ref(null)
const cards = ref([]);
const files = ref([]);
const showModal = ref(false);

const handleFileChange = (e) => {
  files.value = Array.from(e.target.files)
}

const uploadImages = async () => {
  const urls = []

  for (const file of files.value) {
    const fileName = `card-${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from("cards-images")
      .upload(fileName, file)

    if (error) throw error;

    // obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from("cards-images")
      .getPublicUrl(fileName)

    urls.push(publicUrl)
  }

  return urls
}

const saveCard = async () => {
  try {
    const imageUrls = await uploadImages()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError;
    if (!user) throw new Error("No hay usuario logueado")

    const { error } = await supabase
      .from("cards")
      .insert({
        title: newCard.value.title,
        description: newCard.value.description,
        barrio: newCard.value.barrio,
        images: imageUrls,
        user_id: user.id
      })

    if (error) throw error;

    await fetchCards()
    alert("Card guardada con éxito ✅")
    showModal.value = false
  } catch (err) {
    console.error(err)
    alert("Error al guardar la card ❌")
  }
}

async function updateCard() {
  try {
    const { error } = await supabase
      .from("cards")
      .update({
        title: newCard.value.title,
        barrio: newCard.value.barrio,
        description: newCard.value.description,
        images: newCard.value.images
      })
      .eq("id", selectedCard.value.id)

    if (error) throw error;

    await fetchCards()
    closeModal()
    alert("Card actualizada ✅")
  } catch (err) {
    console.error("Error actualizando card:", err.message)
    alert("Error al actualizar ❌")
  }
}

// Eliminar card
const deleteCard = async (id) => {
  const { error } = await supabase.from("cards").delete().eq("id", id);
  if (!error) {
    cards.value = cards.value.filter((c) => c.id !== id);
    await fetchCards();
  }
};

function closeModal() {
  showModal.value = false
  isEditing.value = false
  selectedCard.value = null
  newCard.value = { title: "", barrio: "", description: "", images: [] }
}

const fetchCards = async () => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .order("created_at", { ascending: false })

  if (!error) {
    cards.value = data
  } else {
    console.error("Error trayendo cards:", error.message)
  }
}

function openAddModal() {
  closeModal() // limpia todo
  showModal.value = true
}

function editCard(card) {
  isEditing.value = true
  selectedCard.value = card
  newCard.value = { ...card }
  showModal.value = true
}

const enviarNewsletter = async () => {
  try {
    const response = await fetch("https://yjuoxhayeiktnnhsoeqw.supabase.co/functions/v1/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
      },
    });

    const text = await response.text();
    alert(text); // “✅ Correos enviados exitosamente” o “No hay suscriptores aún.”
  } catch (err) {
    console.error("Error al enviar newsletter:", err);
    alert("❌ Error al enviar el newsletter.");
  }
};

onMounted(async () => {
  fetchCards()
});
</script>

<template>
  <section class="w-full h-[77vh] place-content-center px-4">
    <div class="admin-container">
      <header class="admin-header">
        <h2 class="text-center text-5xl font-semibold">{{ datos.title }}</h2>
        <p class="text-center text-xl font-light text-sky-800">{{ datos.subtitle }}</p>
      </header>

      <article class="w-full flex flex-col admin-info-table">
        <div class="admin-btn-container flex gap-4 my-4 ml-auto px-4">
          <button @click="openAddModal" class="btn btn-agregar-card">
            Agregar Joya Card
          </button>

          <button @click="enviarNewsletter" class="btn btn-enviar">
            Enviar Correo 📬
          </button>
        </div>

        <section class="w-full admin-table-container">
          <h2 class="text-2xl font-semibold text-center mb-5">Lista de Joya Cards</h2>

          <table class="w-full border-collapse">
            <thead>
              <tr class="text-2xl">
                <th class="border p-2 text-left">Título</th>
                <th class="border p-2 text-left">Barrio</th>
                <th class="border p-2 text-left">Descripción</th>
                <th class="border p-2 text-left">Fecha</th>
                <th class="border p-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="card in cards" :key="card.id">
                <td class="border p-2">{{ card.title }}</td>
                <td class="border p-2">{{ card.barrio }}</td>
                <td class="border p-2 truncate max-w-xs">{{ card.description }}</td>
                <td class="border p-2">
                  {{ new Date(card.created_at).toLocaleDateString() }}
                </td>
                <td class="border p-2 text-center">
                  <button @click="deleteCard(card.id)"
                    class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2">
                    Eliminar
                  </button>
                  <button @click="editCard(card)"
                    class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
    </div>
  </section>

  <ModalJema :show="showModal" @close="showModal = false" :title="isEditing ? 'Editar Joya Card' : 'Agregar Joya Card'">
    <template #content>
      <form @submit.prevent="isEditing ? updateCard() : saveCard()" class="flex flex-col gap-3 items-end">
        <div class="form-input">
          <label for="titulo">Titulo</label>
          <input type="text" v-model="newCard.title" id="titulo" name="titulo" />
        </div>

        <div class="form-input">
          <label for="barrio">Barrio</label>
          <input type="text" v-model="newCard.barrio" id="barrio" name="barrio" />
        </div>

        <div class="form-input">
          <label for="description">Descripción</label>
          <textarea v-model="newCard.description" id="description" name="description"></textarea>
        </div>

        <div class="form-input">
          <label for="images">Imágenes</label>
          <input type="file" multiple accept="image/*" @change="handleFileChange" id="images" name="images" />
        </div>

        <button type="submit">{{ isEditing ? "Actualizar" : "Guardar" }}</button>
      </form>
    </template>
  </ModalJema>
</template>

<style scoped lang="scss">
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--width-1200);
  padding: 0.5rem;
  border-radius: 1rem;

  & article {

    & .admin-btn-container {

      & .btn {
        padding: 0.5rem 0.85rem;
        background: var(--azul-claro-40);
        border: 2px solid var(--azul-claro-80);
        border-radius: 0.5rem;
        font-size: 1em;
        font-weight: 500;

        &:hover {
          background: var(--azul-claro-80);
        }
      }
    }
  }
}

form {

  & .form-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    & label {
      font-weight: 400;
      font-size: 1.2em;
    }

    & input,
    & textarea {
      width: 70%;
      padding: 0.5rem;
      border: 1px solid rgb(59, 130, 246);
      border-radius: 1rem;
    }
  }

  & button {
    padding: 0.5rem;
    border: 1px solid rgb(59, 130, 246);
    border-radius: 1rem;
    position: absolute;
    bottom: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .admin-container {

    & .admin-table-container {
      overflow-x: auto;

      & table {
        min-width: 600px;

        & td,
        th {
          font-size: 0.8em;
          font-weight: lighter;
        }
      }
    }
  }
}
</style>

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
const files = ref([]); // imágenes seleccionadas
const showModal = ref(false);

const handleFileChange = (e) => {
  files.value = Array.from(e.target.files)
}

const uploadImages = async () => {
  const urls = []

  for (const file of files.value) {
    const fileName = `card-${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from("cards-images")
      .upload(fileName, file)

    if (error) throw error

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

    const { error } = await supabase
      .from("cards")
      .insert({
        title: newCard.value.title,
        description: newCard.value.description,
        barrio: newCard.value.barrio,
        images: imageUrls // guardamos array de URLs
      })

    if (error) throw error

    const { data: { user } } = await supabase.auth.getUser()
    console.log("Usuario logeado:", user)

    await fetchCards();
    alert("Card guardada con éxito ✅")
    showModal.value = false
  } catch (err) {
    console.error(err)
    alert("Error al guardar la card ❌")
  }
}

async function updateCard() {
  const { data, error } = await supabase
    .from("cards")
    .update({
      title: newCard.value.title,
      barrio: newCard.value.barrio,
      description: newCard.value.description,
      images: newCard.value.images
    })
    .eq("id", selectedCard.value.id)

  if (error) {
    console.error("Error actualizando card:", error.message)
    return
  }

  // refrescar lista
  await fetchCards()
  closeModal()
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
  newCard.value = { ...card } // clonar datos
  showModal.value = true
}

onMounted(async () => {
  fetchCards()
});
</script>

<template>
  <section class="w-full h-screen">
    <div class="admin-container">
      <header class="admin-header">
        <h2 class="text-center text-3xl font-semibold">{{ datos.title }}</h2>
        <p class="text-center text-xl font-light text-sky-800">{{ datos.subtitle }}</p>
      </header>

      <article class="w-full flex flex-col gap-4">
        <div>
          <button @click="openAddModal" class="bg-blue-500 text-white p-2 rounded-xl font-bold">
            Agregar Joya Card
          </button>
        </div>

        <section class="w-full">
          <h2 class="text-2xl font-semibold text-center mb-5">Lista de Joya Cards</h2>

          <table class="w-full border-collapse">
            <thead class="bg-sky-100">
              <tr>
                <th class="border p-2 text-left">Título</th>
                <th class="border p-2 text-left">Barrio</th>
                <th class="border p-2 text-left">Descripción</th>
                <th class="border p-2 text-left">Fecha</th>
                <th class="border p-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="card in cards" :key="card.id" class="hover:bg-gray-100">
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
  gap: 5rem;
  width: var(--width-1200);
  min-height: 30dvh;
  margin-inline: auto;
  padding: 0.5rem;
  border: 2px solid rgba(30, 64, 175, 0.25);
  border-radius: 1rem;

  & .admin-header {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 5px;
      background: linear-gradient(to right, transparent, rgba(3, 13, 46, 0.5));
      border-radius: 1rem;
      bottom: 2rem;
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
</style>

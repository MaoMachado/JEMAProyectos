<script>
import { getCards, addCard, updateCard, deleteCard, uploadImage } from '@/services/cardServicies';
import FormCard from './FormCard.vue';

export default {
  name: 'DialogTableCards',

  data() {
    return {
      cards: [],
      showAddForm: false,
      galeriaActiva: null
    }
  },

  methods: {
    async fetchCards() {
      try {
        this.cards = await getCards();
        console.log('Cards obtenidas desde supabase:', this.cards)
      } catch (err) {
        console.error('Error al cargar las cards: ', err)
      }
    },

    async addCard() {
      try {
        const titulo = prompt('Titulo:');
        const descripcion = prompt('Description:');

        const portadaFile = document.createElement('input');
        portadaFile.type = 'file';
        portadaFile.accept = 'image/*';
        portadaFile.click();

        portadaFile.onchange = async () => {
          const portadaUrl = await uploadImage(portadaFile.files[0], "portadas");

          const galeriaInput = document.createElement('input')
          galeriaInput.type = 'file'
          galeriaInput.accept = 'image/*'
          galeriaInput.multiple = true
          galeriaInput.click()

          galeriaInput.onchange = async () => {
            const galeriaUrls = [];
            for (const file of galeriaInput.files) {
              const url = await uploadImage(file, "galeria")
              galeriaUrls.push(url)
            }

            // Guardar en la tabla
            await addCard({
              title: titulo,
              description: descripcion,
              img_portada: portadaUrl,
              galeria: galeriaUrls,
              activa: true
            })

            await this.fetchCards()
          }
        }
      } catch (err) {
        console.error('Error al agregar la card:', err)
      }
    },

    async editCard(card) {
      const titulo = prompt('Nuevo título:', card.title)
      const descripcion = prompt('Nueva descripción:', card.description)
      const img_portada = prompt('Nueva URL portada:', card.img_portada)
      const galeria = prompt('Nuevas URLs galería separadas por coma:', card.galeria.join(',')).split(',')
      await updateCard(card.id, { title: titulo, description: descripcion, img_portada, galeria })
      await this.fetchCards()
    },

    async deleteCard(id) {
      if (confirm('¿Seguro que quieres eliminar esta card?')) {
        await deleteCard(id)
        await this.fetchCards()
      }
    },

    abrirGaleria(card) {
      this.galeriaActiva = card;
    }
  },

  watch: {
    showCardsDialog(newVal) {
      if (newVal) this.fetchCards()
    }
  },

  props: {
    showCardsDialog: {
      type: Boolean,
      default: false
    }
  },

  components: {
    FormCard
  }
}
</script>

<template>
  <main role="main" v-if="showCardsDialog">
    <section class="section-container">

      <div class="cards-table" aria-labelledby="table-title">
        <h2 id="table-title" class="table-title">
          Cards Activas
        </h2>

        <table class="table-container" role="table">
          <thead class="table-header">
            <tr class="header-titles">
              <th>Titulo Card</th>
              <th>Imagen Portada</th>
              <th>Descripción Card</th>
              <th>Galería</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody class="table-body">
            <tr v-for="card in cards" :key="card.id" class="table-body">
              <td>{{ card.title }}</td>
              <td>
                <div class="portada-container">
                  <img class="img-portada" :src="card.img_portada" alt="Portada" loading="lazy" />
                </div>
              </td>
              <td>{{ card.description }}</td>
              <td>
                <div class="galeria-continer" @click="abrirGaleria(card)">
                  <img :src="card.galeria[0]" alt="Primera imagen" class="img-preview" loading="lazy" />
                  <div v-if="card.galeria.length > 1" class="img-overlay">
                    +{{ card.galeria.length - 1 }}
                  </div>
                </div>

                <!-- Modal Galeria -->
                <div v-if="galeriaActiva === card" class="modal-overlay" @click="galeriaActiva === null">
                  <div class="modal-content" @click.stop>
                    <button class="btn-cerrar" @click="galeriaActiva = null">Cerrar</button>
                    <div class="modal-galeria">
                      <img v-for="(img, index) in card.galeria" :key="index" :src="img" :alt="`Imagen ${index + 1}`"
                        loading="lazy" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="btn-group">
                  <button type="submit" @click="editCard(card)" class="btn btn-edit">Editar</button>
                  <button type="submit" @click="deleteCard(card.id)" class="btn btn-delete">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <section class="section-formCard">
        <div class="btn-container">
          <button class="btn-add-card" @click="showAddForm = true">Agregar Nueva Card</button>
        </div>
        <div class="section-form">
          <FormCard v-if="showAddForm" :showAddForm=showAddForm @card-added="fetchCards(); showAddForm = false"
            @cancel="showAddForm = false" />
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
main .section-container {
  display: grid;
  place-content: center;
  width: 100%;
  min-height: 60vh;
  padding: 1.5rem;
}

.cards-table {
  min-width: 1200px;
  max-width: 300px;
  width: 100%;
}

.cards-table .table-title {
  text-align: center;
}

.cards-table .table-container {
  width: 100%;
}

.table-container .header-titles {
  color: var(--blanco);
  background: var(--azul-principal);
  font-size: 1.2em;
}

.header-titles th {
  padding: 0.5rem;
  font-family: var(--fuente-titulo);
}

.table-body td {
  text-align: center;
  font-family: var(--fuente-texto);
  font-size: 1.2em;
  border: 1px solid var(--azul-oscuro-50);
  border-radius: 0.5rem;
}

.table-body .portada-container,
.galeria-continer {
  width: 100px;
  height: 100px;
  padding: 0.5rem;
  margin-inline: auto;
}

.galeria-continer {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  cursor: pointer;
}

.galeria-continer .img-overlay {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 6px;
  border-radius: 0 4px 0 4px;
  font-size: 0.8em;
}

.portada-container .img-portada,
.img-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.btn-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  ;
  row-gap: 0.5rem;
}

.btn-group .btn {
  width: 50%;
  padding: 0.5rem;
  border: 2px solid var(--azul-principal-50);
  border-radius: 0.5rem;
  font-size: 0.9em;
  font-family: var(--fuente-titulo);
  cursor: pointer;
}

.btn-group .btn-edit {
  background: var(--verde-50);
}

.btn-edit:hover {
  background: var(--verde);
}

.btn-group .btn-delete {
  background: var(--naranja-50);
}

.btn-delete:hover {
  background: var(--naranja);
}

.section-container .section-formCard {
  display: grid;
  place-content: center;
  min-height: 20vh;
  padding-block: 0.5rem;
}

.section-formCard .btn-container {
  padding: 1rem;
  margin-inline: auto;
  border-radius: 0.25rem;
}

.btn-container .btn-add-card {
  padding: 0.5rem 1rem;
  background: var(--azul-principal);
  border: 2px solid var(--azul-principal);
  border-radius: 0.5rem;
  font-size: 1em;
  font-family: var(--fuente-titulo);
  color: var(--blanco);
  cursor: pointer;
}

.btn-add-card:hover {
  box-shadow: var(--shadow-xl);
}

.section-form {
  width: 500px;
}

/* Modal Galeria */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay .modal-content {
  max-width: 90%;
  max-height: 90%;
  padding: 1rem;
  background: #fff;
  border-radius: 0.8rem;
  overflow-y: auto;
}

.modal-content .modal-galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.modal-galeria img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-content .btn-cerrar {
  display: block;
  margin-left: auto;
  margin-bottom: 1rem;
  background: var(--naranja-50);
  border: none;
  border-radius: 1rem;
  padding: 0.8rem;
  font-size: 1em;
  cursor: pointer;
}

.btn-cerrar:hover {
  background: var(--naranja);
}
</style>

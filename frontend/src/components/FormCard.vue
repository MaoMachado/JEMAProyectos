<script>
import { addCard, uploadImage } from '@/services/cardServicies';

export default {
  name: 'FormCard',

  data() {
    return {
      newCard: {
        title: '',
        description: '',
        portadaFile: null,
        galeriaFiles: []
      }
    }
  },

  methods: {
    handlePortadaUpload(e) {
      this.newCard.portadaFile = e.target.files[0];
    },

    handleGaleriaUpload(e) {
      this.newCard.galeriaFiles = Array.from(e.target.files);
    },

    async submitNewCard() {
      if (!this.newCard.portadaFile) {
        console.error("Debes seleccionar una imagen de portada antes de guardar.");
        return;
      };

      try {
        const portadaUrl = await uploadImage(this.newCard.portadaFile, "portadas");
        const galeriaUrls = [];

        for (const file of this.newCard.galeriaFiles) {
          const url = await uploadImage(file, "galeria");
          galeriaUrls.push(url);
        };

        await addCard({
          title: this.newCard.title,
          description: this.newCard.description,
          img_portada: portadaUrl,
          galeria: galeriaUrls,
          activa: true
        });

        this.$emit('card-added');

      } catch (err) {
        console.error('Error al agregar la card:', err);
      }
    },

    cancelNewCard() {
      this.$emit('cancel');
    }
  },

  props: {
    showAddForm: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <main role="main" v-if="showAddForm" aria-labelledby="form-title" class="dialog-formCard">

    <div class="dialog-header" aria-labelledby="form-title">
      <h2 class="header-title" id="form-title">
        Nueva Card
      </h2>
    </div>

    <form @submit.prevent="submitNewCard" class="form-container" role="form">
      <div class="input-group">
        <input type="text" v-model="newCard.title" placeholder=" " class="input input-title" id="title" />
        <label for="title">Titulo</label>
      </div>

      <div class="input-group">
        <textarea v-model="newCard.description" name="description" id="description" placeholder=" "
          class="input input-description"></textarea>
        <label for="description">Descripción</label>
      </div>

      <div class="input-group">
        <input type="file" name="img-portada" id="img-portada" @change="handlePortadaUpload" accept="image/*"
          class="input-img-portada" />
        <!-- <label for="img-portada">Imagen Portada</label> -->
      </div>

      <div class="input-group">
        <input type="file" name="img-galeria" id="img-galeria" @change="handleGaleriaUpload" accept="image/*" multiple
          class="input-img-galeria" />
        <!-- <label for="img-galeria">Galeria (Puedes seleccionar varias)</label> -->
      </div>

      <div class="btn-group">
        <button type="submit" class="btn btn-guardar">Guardar</button>
        <button type="button" @click="cancelNewCard" class="btn btn-cancelar">Cancelar</button>
      </div>
    </form>

  </main>
</template>

<style scoped>
.dialog-formCard {
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.dialog-header {
  width: 100%;
  background: var(--azul-principal);
}

.dialog-header .header-title {
  margin: 0;
  padding-block: 0.25rem;
  color: var(--blanco);
  text-align: center;
  font-family: var(--fuente-titulo);
  font-size: 1.5em;
  font-weight: 100;
}

.dialog-formCard .form-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
}

.form-container .input-group {
  position: relative;
}

.input-group label {
  position: absolute;
  left: 12px;
  top: 8px;
  font-size: 1em;
  font-family: var(--fuente-titulo);
  transition: all 0.2s ease-in-out;

}

.input-group input[type="text"],
textarea {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  font-size: 1em;
  font-family: var(--fuente-texto);
  border: 1px solid var(--azul-principal-50);
  border-radius: 0.5rem;
}

.input-group input[type="file"] {
  width: 100%;
  cursor: pointer;
}

.input-group input[type="text"]:focus,
.input-group textarea:focus {
  border: 1px solid var(--azul-principal);
  outline: none;
}

.input-group input[type="text"]:focus+label,
.input-group textarea:focus+label,
.input-group input:not(:placeholder-shown)+label,
.input-group textarea:not(:placeholder-shown)+label {
  padding: 0.05rem 0.25rem;
  top: -0.8rem;
  font-size: 0.8rem;
  color: var(--blanco);
  background: var(--azul-principal);
  border-radius: 0.5rem;
  opacity: 0.8;
}

.btn-group {
  display: flex;
  justify-content: center;
  column-gap: 1rem;
}

.btn-group .btn {
  padding: 7px 12px;
  border: none;
  border-radius: 8rem;
  font-family: var(--fuente-titulo);
  font-size: 1em;
  cursor: pointer;
}

.btn-guardar {
  background: var(--azul-principal-50);
}

.btn-guardar:hover {
  background: var(--azul-principal);
  color: var(--blanco);
  box-shadow: var(--shadow-sm);
}

.btn-cancelar {
  background: var(--naranja-50);
}

.btn-cancelar:hover {
  background: var(--naranja);
  box-shadow: var(--shadow-sm);
}
</style>

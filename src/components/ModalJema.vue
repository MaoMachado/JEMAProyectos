<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import btnClose from "@/assets/img/icons/cerrar.svg"

const props = defineProps({
  show: Boolean,
  title: String
})

const emit = defineEmits(["close"])

const handleKeydown = (e) => {
  if (e.key === "Escape") {
    emit("close")
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, { immediate: true });

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "auto"
})
</script>

<template>
  <transition name="fade">
    <section class="modal" v-if="props.show" @click.self="emit('close')" role="dialog" aria-modal="true">
      <transition name="slide-right">
        <div v-if="props.show" class="modal-content">
          <header class="modal-header">
            <h2 class="text-4xl max-md:text-xl">{{ props.title }}</h2>
            <button class="close-btn" @click="emit('close')">
              <img :src="btnClose" alt="Botón de cerrar el modal" loading="lazy" />
            </button>
          </header>
          <div class="modal-body p-5">
            <slot name="content"></slot>
          </div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<style scoped lang="scss">
.modal {
  display: grid;
  place-content: center;
  inline-size: 100vw;
  block-size: 100vh;
  background: hsla(0, 0%, 0%, 0.4);
  backdrop-filter: blur(5px) saturate(120%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  & .modal-content {
    width: min(50vw, 1200px);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem var(--azul-oscuro-60);
    background: var(--azul-claro-60);
    color: var(--negro);
    position: relative;

    .dark & {
      box-shadow: 0 0 1rem var(--azul-claro-40);
      background: var(--azul-oscuro-60);
      color: var(--blanco);
    }

    & .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
    }

    & .close-btn {
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
      cursor: pointer;

      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .modal {

    & .modal-content {
      width: 95dvw;
      margin-inline: auto;

      & .modal-body {
        padding: 0;
        margin-inline: auto;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

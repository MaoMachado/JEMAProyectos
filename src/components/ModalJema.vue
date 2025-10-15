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
    <section class="modal" v-if="props.show" @click.self="emit('close')">
      <transition name="slide-right">
        <div class="modal-content">
          <header class="modal-header">
            <h2 class="text-3xl font-light">{{ props.title }}</h2>
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
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  & .modal-content {
    width: var(--width-1200);
    min-height: 80dvh;
    margin-inline: auto;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    background: rgb(3, 13, 46);
    color: white;
    position: relative;

    .dark & {
      background: var(--azul-oscuro-80);
      color: var(--blanco);
    }

    & .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
    }

    & .close-btn {
      background: transparent;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 768px) {
  .modal {

    & .modal-content {
      width: clamp(400px, 100dvw, 700px);

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
  transition: all 0.4s ease;
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

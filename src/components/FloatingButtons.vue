<script setup>
import { ref, onMounted } from "vue";
import { toggleTheme } from "@/utils/theme";

const show = ref(false);

defineEmits(['toggleHeader'])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  const header = document.querySelector("header");
  if (!header) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        show.value = !entry.isIntersecting;
      });
    },
    { threshold: 0 }
  );

  observer.observe(header);
});
</script>

<template>
  <span class="floating-btn" :class="{ show }">
    <a href="https://wa.me/573123456789" target="_blank" rel="noopener noreferrer" class="btn whatsapp">
      <img src="@/assets/img/icons/whatsapp.svg" alt="Whatsapp" />
    </a>

    <button class="btn darkmode" @click="toggleTheme">
      <img src="@/assets/img/icons/dark-theme.svg" alt="Modo oscuro" />
    </button>

    <button class="btn up" @click="scrollToTop">
      <img src="@/assets/img/icons/up.png" alt="Ir arriba" />
    </button>

    <button class="btn menu" @click="$emit('toggleHeader')">
      <img src="@/assets/img/icons/menu.svg" alt="Menu" />
    </button>
  </span>
</template>

<style scoped lang="scss">
.floating-btn {
  position: fixed;
  top: 50%;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: 0;
  pointer-events: none;
  transform: translateX(20px) translateY(-50%);
  transition: all 0.15s ease;
  z-index: 20;

  &.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0) translateY(-50%);
  }

  & .btn {
    display: grid;
    place-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    .dark & {
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
    }

    &:hover {
      background: rgba(59, 130, 246, 0.8);
    }

    & img {
      width: 30px;
      height: 30px;
    }
  }

  & .menu {
    display: none;
  }
}

@media (max-width: 768px) {
  .floating-btn {
    flex-direction: row;
    top: 95%;
    right: 22%;

    & .btn {
      background: var(--azul-oscuro-40);
    }

    & .menu{
      display: grid;
    }
  }
}
</style>

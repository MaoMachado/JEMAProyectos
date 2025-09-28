<script setup>
import { ref, onMounted } from "vue";
import { toggleTheme } from "@/utils/theme";

const show = ref(false);

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
  </span>
</template>

<style scoped lang="scss">
.floating-btn {
  position: fixed;
  top: 20px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: all 0.15s ease;
  z-index: 20;

  &.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  & .btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    .dark &{
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
    }

    &:hover{
      background: rgba(59, 130, 246, 0.8);
    }

    & img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>

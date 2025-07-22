import { ref, onMounted } from "vue";

export function useFadeIn() {
  const isVisible = ref(false);

  onMounted(() => {
    requestAnimationFrame(() => {
      isVisible.value = true;
    })
  })

  return { isVisible };
}

// stores/toastStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  const message = ref("");
  const type = ref("success");
  const show = ref(false);

  function triggerToast(msg, toastType = "success") {
    message.value = msg;
    type.value = toastType;
    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 3000);
  }

  return { message, type, show, triggerToast };
});

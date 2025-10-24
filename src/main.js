import "./assets/styles/main.css";
import "./assets/styles/main.scss";
import "aos/dist/aos.css";

import { createApp } from "vue";
import { supabase } from "../supabase.config";
import { createPinia } from "pinia";
import { initAuthListener } from "./utils/auth";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";

const app = createApp(App);

initAuthListener(router);

supabase.auth.getSession().then(({ data }) => {
  if (data.session) {
    localStorage.setItem("jema_user", JSON.stringify(data.session.user));
  } else {
    localStorage.removeItem("jema_user");
  }
});

app.use(createPinia());
app.use(router);
app.mount("#app");

AOS.init({
  duration: 1000,
  easing: "ease-out",
  once: true,
});

router.afterEach(() => {
  setTimeout(() => {
    AOS.refresh();
  }, 500);
});

// createApp(App).use(router).mount('#app')

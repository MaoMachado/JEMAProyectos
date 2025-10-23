import "./assets/styles/main.css";
import "./assets/styles/main.scss";

import { createApp } from "vue";
import { supabase } from "../supabase.config";
import { createPinia } from "pinia";
import { initAuthListener } from "./utils/auth";
import App from "./App.vue";
import router from "./router";

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

// createApp(App).use(router).mount('#app')

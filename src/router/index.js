import { createRouter, createWebHistory } from "vue-router";

// Importe de las vistas
import Home from "@/views/Home.vue";
import JoyasJema from "@/views/JoyasJema.vue";
import Contacto from "@/views/Contacto.vue";

const routes = [
  {
    path: "/", name: 'Home', component: Home
  },
  {
    path: "/joyas-jema", name: 'JoyasJema', component: JoyasJema
  },
  {
    path: "/contacto", name: 'Contacto', component: Contacto
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
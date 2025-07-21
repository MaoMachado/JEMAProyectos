import { createRouter, createWebHistory } from "vue-router";

// Importe de las vistas
import Home from "@/views/Home.vue";
import JoyasJema from "@/views/JoyasJema.vue";
import Contacto from "@/views/Contacto.vue";
import ChatAdmin from "@/views/ChatAdmin.vue";
import NotFount from "@/views/NotFount.vue";

const routes = [
  {
    path: "/", name: 'Home', component: Home
  },
  {
    path: "/joyas-jema", name: 'JoyasJema', component: JoyasJema
  },
  {
    path: "/contacto", name: 'Contacto', component: Contacto
  },
  {
    path: "/admin/chat", name: 'ChatAdmin', component: ChatAdmin
  },
  {
    path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFount
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

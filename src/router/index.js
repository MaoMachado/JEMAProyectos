import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../../supabase.config.js";
import Home from "@/views/HomeJema.vue";
import Login from "@/views/LoginJema.vue";
import Admin from "@/views/AdminJema.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/admin", name: "Admin", component: Admin, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const localUser = JSON.parse(localStorage.getItem("jema_user"));

  // 1️⃣ Si intenta ir a /login y ya está logueado → lo mandamos al admin
  if (to.path === "/login" && (session || localUser)) {
    return next("/admin");
  }

  // 2️⃣ Si la ruta requiere login y no hay sesión → lo mandamos al login
  if (to.meta.requiresAuth && !session && !localUser) {
    console.warn("⛔ Acceso denegado, redirigiendo a login...");
    return next("/login");
  }

  // 3️⃣ Si todo está bien → continua normal
  next();
});

export default router;

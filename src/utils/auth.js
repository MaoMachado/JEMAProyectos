import { supabase } from "../../supabase.config.js";

export const initAuthListener = (router) => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("Evento de sesión:", event, session);

    if (event === "SIGNED_IN") {
      console.log("✅ Usuario autenticado:", session.user.email);
      // Aquí podrías guardar el usuario en Pinia, Vuex o LocalStorage
      localStorage.setItem("jema_user", JSON.stringify(session.user));
    }

    if (event === "SIGNED_OUT") {
      console.log("🚪 Sesión cerrada");
      localStorage.removeItem("jema_user");
      router.push("/login");
    }
  });
};

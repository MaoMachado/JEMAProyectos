import { supabase } from "../../supabase.config.js";

export const initAuthListener = (router) => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      // Aquí podrías guardar el usuario en Pinia, Vuex o LocalStorage
      localStorage.setItem("jema_user", JSON.stringify(session.user));
    }

    if (event === "SIGNED_OUT") {
      localStorage.removeItem("jema_user");
      router.push("/login");
    }
  });
};

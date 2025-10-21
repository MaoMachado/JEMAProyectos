import { supabase } from "../../supabase.config";

export const probarConexion = async () => {
  const { data, error } = await supabase.from("suscriptores").select("*");

  if (error) {
    console.error("❌ Error al conectar con Supabase:", error);
  } else {
    console.log("✅ Conexión exitosa. Datos:", data);
  }
};

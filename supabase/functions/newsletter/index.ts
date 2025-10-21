// supabase/functions/enviar-newsletter/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // puedes restringirlo luego a tu dominio render
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("🚀 Iniciando envío de newsletter...");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const resend = new Resend(RESEND_API_KEY);
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: suscriptores, error } = await supabase.from("suscriptores").select("email");

    if (error) throw error;

    if (!suscriptores?.length) {
      console.log("⚠️ No hay suscriptores registrados.");
      return new Response("No hay suscriptores aún.", { status: 200 });
    }

    const asunto = "🏡 Gema Inmobiliaria - Novedades de la semana";
    const contenido = `
      <h2>¡Hola!</h2>
      <p>Estas son las últimas novedades de Gema Inmobiliaria:</p>
      <ul>
        <li>Nuevas propiedades disponibles</li>
        <li>Promociones exclusivas para nuestros suscriptores</li>
        <li>Y mucho más...</li>
      </ul>
      <p>Visítanos en <a href="https://gemainmobiliaria.com" target="_blank">gemainmobiliaria.com</a></p>
    `;

    for (const s of suscriptores) {
      await resend.emails.send({
        from: "Gema Inmobiliaria <no-reply@gemainmobiliaria.com>",
        to: s.email,
        subject: asunto,
        html: contenido,
      });
    }

    return new Response("✅ Correos enviados exitosamente", {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error en enviar-newsletter:", error);
    return new Response("❌ Error al enviar correos", {
      status: 500,
      headers: corsHeaders,
    });
  }
});

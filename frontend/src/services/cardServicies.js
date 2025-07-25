import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**Subir una imagen a supabase */
export async function uploadImage(file, tipo = "generico") {
  const fileName = `${tipo}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from('cards-storage')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error("Error subiendo imagen: ", error.message);
    throw new Error("No se pudo subir la imagen");
  }

  const { data: publicUrl } = supabase.storage
    .from('cards-storage')
    .getPublicUrl(fileName);

  return publicUrl.publicUrl
}

export async function getCards() {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('activa', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error al obtener cards: ", error.message);
    throw new Error("No se pudo obtener las cards");
  };

  return data.map(card => ({
    ...card,
    galeria: Array.isArray(card.galeria)
      ? card.galeria
      : typeof card.galeria === 'string'
        ? JSON.parse(card.galeria.replace(/{/g, "[").replace(/}/g, "]"))
        : []
  }));
};

export async function addCard(card) {
  const { data, error } = await supabase.from('cards').insert([card]);

  if (error) {
    console.error("Error agregar la card: ", error.message);
    throw new Error("No se pudo subir la card");
  };

  return data
};

export async function updateCard(id, updatedCard) {
  const { data, error } = await supabase
    .from('cards')
    .update(updatedCard)
    .eq('id', id)

  if (error) {
    console.error("Error al actualizar la card: ", error.message);
    throw new Error("No se pudo actualizar la card");
  };

  return data
};

export async function deleteCard(id) {
  const { error } = await supabase.from('cards').delete().eq('id', id);

  if (error) {
    console.error("Error al eliminar la card ", error.message);
    throw new Error("No se pudo eliminar la card");
  };

  return true
}

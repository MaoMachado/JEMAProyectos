import { WhatsAppContainer } from "./IconosWhatsAppStyle";
import { FaWhatsappSquare } from "react-icons/fa";

export const IconoWhatsApp = () => {
  const whatsappNumber = "+573169274523";
  const url = `https://wa.me/${whatsappNumber}?text=Hola,%20me%20interesa%20su%20servicio`;

  return (
    <WhatsAppContainer href={url} target="_blank" rel="noopener noreferrer">
      <FaWhatsappSquare size={50} color={"var(--azul)"} />
    </WhatsAppContainer>
  );
};

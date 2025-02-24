import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

import { FormularioEmail } from "./FormularioEmail";
import { ContactoJemaContainer } from "./ContactoStyle";
import j from "../../assets/J.png";

export const Contacto = () => {
  return (
    <ContactoJemaContainer>
      <article className="contactoContainer">
        <div className="infoContacto">
          <h2>Construyendo el Futuro con Solidez y Confianza</h2>
          <p>
            En JEMA Proyectos, transformamos ideas en realidades sólidas. Con
            experiencia en el diseño y desarrollo de proyectos de ingeniería
            civil, ofrecemos soluciones eficientes y de calidad. Si buscas
            asesoría profesional o estás interesado en adquirir una propiedad,
            contáctanos hoy mismo y da el primer paso hacia tu próxima
            inversión. 📩 Escríbenos y hagamos realidad tu proyecto.
          </p>
          <div className="whatsContainer">
            <img src={j} alt="Logo de Jema Proyectos" />
            <FaWhatsapp size={40} color={"var(--azul)"} />
            <span>316 927 45 23</span>
          </div>
          <div className="whatsContainer">
            <img src={j} alt="Jema Proyectos" />
            <CiMail size={40} color={"var(--azul)"} />
            <span>gerencia@jemaproyectos.com</span>
          </div>
        </div>
        <div className="formContainer">
          <h2>Contactanos</h2>
          <FormularioEmail />
        </div>
      </article>
    </ContactoJemaContainer>
  );
};

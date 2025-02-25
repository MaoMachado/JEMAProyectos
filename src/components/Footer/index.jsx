import j from "../../assets/J.png";
import { FooterContainer } from "./FooterStyle";
import { FaFacebookSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <FooterContainer>
      <section className="info_footer_container">
        <div className="info_container">
          <p>
            © 2024 Todos los derechos reservados. JEMA, Estamos comprometidos
            con la excelencia en ingeniería civil y diseño arquitectónico. Como
            parte de nuestro compromiso con la innovación y el progreso, nos
            enorgullece presentar el Proyecto JEMA.
          </p>
        </div>
        <div className="social_container">
          <a
            href="https://www.facebook.com/share/15ysM2BARH/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaFacebookSquare size={40} />
          </a>
          <img src={j} alt="Logo de JEMAProyectos" />
        </div>
      </section>
    </FooterContainer>
  );
};

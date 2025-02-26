import styled from "styled-components";
import { JoyasCarrousel } from "./JoyasCarrouse";

const DialogContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  .modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 70%;
    min-height: 200px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 20px var(--azulTransparente);
    background-color: #222;
    transform: ${({ $show }) =>
      $show ? "translateY(0)" : "translateY(-20px)"};
    transition: transform 0.3s ease;

    @media (max-width: 425px) {
      gap: 1rem;
      width: 95%;
      height: 95%;
      padding: 10px;
    }

    .container_modal {
      display: flex;
      align-items: center;

      @media (max-width: 425px) {
        gap: 1rem;
        flex-direction: column;
        overflow: auto;
      }
    }

    .joyasCarrouselContainer {
      flex: 1;
    }

    .joyasInfoContainer {
      flex: 1;
      display: flex;
      gap: 1rem;
      flex-direction: column;
      padding: 0 5px;

      @media (max-width: 425px) {
        width: 100%;
      }

      text-align: center;

      h2 {
        font-size: 2em;
        font-family: "Roboto";
        color: var(--blanco);
      }

      p {
        text-align: justify;
        font-size: 1.5em;
        font-family: "Roboto";
        color: var(--blanco);
      }
    }
  }
`;

export const JoyasModal = ({ onOpen, onClose }) => {
  return (
    <DialogContainer $show={onOpen}>
      <section className="modal">
        <div className="container_modal">
          <article className="joyasCarrouselContainer">
            <JoyasCarrousel />
          </article>
          <article className="joyasInfoContainer">
            <h2>¡Tu nuevo hogar o inversión ideal te espera!</h2>
            <p>
              Ubicada en una zona familiar y hotelera, esta amplia propiedad es
              perfecta tanto para vivienda como para negocio. Cuenta con 7
              habitaciones, ideales para una familia numerosa o para alojamiento
              turístico. Además, dispone de 4 baños que garantizan comodidad
              para todos. Disfruta de sus 2 patios, que ofrecen espacios de
              esparcimiento y ventilación natural. Su garaje con capacidad para
              dos vehículos y una motocicleta brinda seguridad y facilidad de
              parqueo. La ubicación es inmejorable, cerca de la estación
              Floresta del metro, lo que garantiza excelente movilidad y acceso
              a servicios esenciales.
            </p>
          </article>
        </div>
        <button onClick={onClose}>Cerrar</button>
      </section>
    </DialogContainer>
  );
};

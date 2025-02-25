import styled from "styled-components";
import { JoyasCarrousel } from "./JoyasCarrouse";

const DialogContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Fondo semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  .modal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    width: 90%;
    min-height: 200px;
    padding: 15px;
    border-radius: 20px;
    box-shadow: 0 0 20px var(--azulTransparente);
    background-color: #222;
    transform: ${({ $show }) =>
      $show ? "translateY(0)" : "translateY(-20px)"};
    transition: transform 0.3s ease;

    @media (max-width: 425px) {
      flex-direction: column;
      overflow-y: scroll;
    }

    .joyasCarrouselContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .joyasInfoContainer {
      flex: 1;
      display: flex;
      gap: 1rem;
      flex-direction: column;
      padding: 0 5px;

      text-align: center;

      h2 {
        font-size: 1.5em;
      }

      p {
        text-align: justify;
        font-family: "Merriweather_Light";
      }
    }
  }
`;

export const JoyasModal = ({ onOpen, onClose }) => {
  return (
    <DialogContainer $show={onOpen}>
      <div className="modal">
        <article className="joyasCarrouselContainer">
          <JoyasCarrousel />
          <button onClick={onClose}>Cerrar</button>
        </article>
        <article className="joyasInfoContainer">
          <h2>¡Tu nuevo hogar o inversión ideal te espera!</h2>
          <p>
            Ubicada en una zona familiar y hotelera, esta amplia propiedad es
            perfecta tanto para vivienda como para negocio. Cuenta con 7
            habitaciones, ideales para una familia numerosa o para alojamiento
            turístico. Además, dispone de 4 baños que garantizan comodidad para
            todos. Disfruta de sus 2 patios, que ofrecen espacios de
            esparcimiento y ventilación natural. Su garaje con capacidad para
            dos vehículos y una motocicleta brinda seguridad y facilidad de
            parqueo. La ubicación es inmejorable, cerca de la estación Floresta
            del metro, lo que garantiza excelente movilidad y acceso a servicios
            esenciales.
          </p>
        </article>
      </div>
    </DialogContainer>
  );
};

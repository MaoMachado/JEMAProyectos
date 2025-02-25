import { useState } from "react";

import styled from "styled-components";
import { JoyasModal } from "./JoyasModal";

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 400px;
  min-height: 200px;
  background-color: var(--azul);
  border-radius: 10px;
  padding-bottom: 1rem;
  overflow: hidden;

  .imgPortadaCard {
    width: 100%;
    height: 250px;
    object-fit: fill;
  }

  h2 {
    font-size: 2.5em;
    font-family: var(--fuenteTitulo);
    font-weight: 100;
    color: var(--blanco);
  }

  p {
    padding: 0 1rem;
    color: var(--blanco);
    font-family: var(--fuenteParrafo);
    font-size: 1.5em;
    text-align: center;
  }

  button {
    padding: 0.8rem 1.2rem;
    border: 2px solid #fff;
    border-radius: 10px;
    background: transparent;
    color: var(--blanco);
    font-size: 1.5em;
    font-family: var(--fuenteTitulo);

    &:hover {
      background-color: #fff;
      color: var(--blue);
      border: 2px solid var(--azul);
    }

    &:active {
      scale: 0.98;
    }
  }
`;

export const JoyasCard = ({ img, titulo, ubicacion }) => {
  const [handleModal, setHandleModal] = useState(false);

  const openModal = () => {
    setHandleModal(true);
  };
  const closeModal = () => {
    setHandleModal(false);
  };

  return (
    <CardContainer>
      <img className="imgPortadaCard" src={img} alt={titulo} />
      <h2>{titulo}</h2>
      <p>{ubicacion}</p>
      <button onClick={openModal}>Mas Información</button>
      <JoyasModal onOpen={handleModal} onClose={closeModal} />
    </CardContainer>
  );
};

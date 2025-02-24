import { useState } from "react";

import styled from "styled-components";
import { JoyasModal } from "./JoyasModal";

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 350px;
  min-height: 200px;
  background-color: var(--azul);
  border-radius: 10px;
  padding-bottom: 5px;
  overflow: hidden;

  .imgPortadaCard {
    width: 100%;
    height: 200px;
    object-fit: fill;
  }

  h2 {
    padding-bottom: 5px;
    border-bottom: 5px solid var(--blueTransparente);
    border-radius: 7px;
    font-size: 2em;
    color: var(--blanco);
  }

  p {
    font-size: 1.2em;
    text-align: center;
    padding: 0 1rem;
    line-height: 1.7rem;
    color: var(--blanco);
  }

  button {
    padding: 0.8rem 1.2rem;
    border: 2px solid #fff;
    border-radius: 10px;
    background: transparent;
    color: #fff;
    font-size: 1rem;

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

import styled from "styled-components";

export const CardsContainer = styled.section`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 90vw;
  user-select: none;
  animation: aparecerCargar 2s linear;

  @keyframes aparecerCargar {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  h2 {
    color: var(--azul);
    text-align: center;
    font-size: clamp(1.7em, 2.5vw, 5em);
    font-family: "Roboto_Regular";
    font-weight: 100;
    width: fit-content;
    padding-bottom: 2px;
    border-bottom: 4px solid hsla(0, 0%, 13%, 0.2);
  }

  .contenedor {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
  }
`;

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
    font-family: "Roboto";
    font-weight: 100;
    width: fit-content;
  }

  .contenedor {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
  }
`;

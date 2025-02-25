import styled from "styled-components";

export const CardsContainer = styled.section`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-evenly;
  width: 90vw;
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
    font-size: clamp(1.2em, 3vw, 5em);
    color: var(--azul);
    text-align: center;
  }

  .contenedor {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
`;

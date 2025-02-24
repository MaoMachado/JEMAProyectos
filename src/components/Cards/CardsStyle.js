import styled from "styled-components";

export const CardsContainer = styled.section`
  display: flex;
  gap: 2rem;
  flex-flow: row wrap;
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

  h1 {
    font-size: 2em;
    font-weight: 500;
    font-family: sans-serif;
    color: var(--blue);
    text-align: center;
  }
`;

import styled from "styled-components";

export const CardContainer = styled.article`
  width: 400px;
  height: 400px;
  border: 2px solid var(--azulTransparente);
  border-left: 5px solid var(--azul);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  display: grid;
  place-content: center;

  &:hover > .imgCard {
    opacity: 1;
    filter: grayscale(0);
  }

  h3 {
    text-align: center;
    font-size: clamp(1.5em, 2vw, 3em);
    font-family: "Roboto";
    font-weight: 100;
    color: var(--negro);
  }

  .imgCard {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.2;
    position: absolute;
    top: 0;
    filter: grayscale(100%);
    transition: opacity 0.1s linear;
  }
`;

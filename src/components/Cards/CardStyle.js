import styled from "styled-components";

export const CardContainer = styled.article`
  width: 300px;
  height: 300px;
  border: 2px solid var(--blueTransparente);
  border-left: 5px solid var(--blue);
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
    font-size: 2em;
    text-align: center;
    color: #000;
  }

  .imgCard {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
    position: absolute;
    top: 0;
    filter: grayscale(100%);
    transition: opacity 0.1s linear;
  }
`;

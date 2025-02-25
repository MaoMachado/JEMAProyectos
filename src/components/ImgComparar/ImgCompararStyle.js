import styled from "styled-components";

export const ComparedContainer = styled.section`
  display: flex;
  gap: 2rem;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  width: clamp(400px, 100vw, 90vw);
  background-color: rgba(204, 204, 204, 0.2);
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

export const InfoContainerCompared = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  flex: 1;
  font-family: "Roboto_Ligth";

  h2 {
    font-size: 2.4em;
    color: var(--azul);
    text-align: center;
  }

  p {
    font-size: 1.3em;
    text-align: justify;
    line-height: 1.5rem;
  }
`;

export const ArticleContainer = styled.article`
  width: 500px;
  height: 300px;
  display: grid;
  place-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  --position: 50%;
  flex: 1;

  @media (max-width: 425px) {
    width: 100%;
  }

  img {
    display: block;
    max-width: 100%;
  }

  .image-container {
    max-width: 100%;
    max-height: 90vh;
    aspect-ratio: 1/1;
  }

  .slider-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left;
  }

  .image-before {
    position: absolute;
    inset: 0;
    width: var(--position);
    filter: grayscale(100%);
    clip-path: inset(0 var(--clip-rigth) 0 0);
  }

  .slider {
    position: absolute;
    inset: 0;
    cursor: pointer;
    opacity: 0;
    /* for Firefox */
    width: 100%;
    height: 100%;
  }

  .slider:focus-visible ~ .slider-button {
    outline: 5px solid black;
    outline-offset: 3px;
  }

  .slider-line {
    position: absolute;
    inset: 0;
    width: 0.2rem;
    height: 100%;
    background-color: #fff;
    /* z-index: 10; */
    left: var(--position);
    transform: translateX(-50%);
    pointer-events: none;
  }

  .slider-button {
    position: absolute;
    background-color: #fff;
    color: black;
    padding: 0.5rem;
    border-radius: 100vw;
    display: grid;
    place-items: center;
    top: 50%;
    left: var(--position);
    transform: translate(-50%, -50%);
    pointer-events: none;
    /* z-index: 100; */
    box-shadow: 1px 1px 1px hsl(0, 50%, 2%, 0.5);
  }
`;

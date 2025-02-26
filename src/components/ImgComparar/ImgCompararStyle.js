import styled from "styled-components";

export const ComparedContainer = styled.section`
  display: flex;
  gap: 2rem;
  justify-content: space-evenly;
  align-items: center;
  width: clamp(400px, 100vw, 90vw);
  background-color: rgba(204, 204, 204, 0.5);
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
  align-items: center;
  flex: 1;

  h2 {
    color: var(--azul);
    text-align: center;
    font-size: clamp(2em, 3vw, 3em);
    font-weight: bold;
    font-family: "Roboto";
  }

  p {
    width: 80%;
    font-size: clamp(1.4em, 3vw, 2em);
    font-family: "Roboto";
    text-align: justify;
    color: var(--negro);
  }
`;

export const ArticleContainer = styled.article`
  flex: 1;
  height: 500px;
  display: grid;
  place-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 2px solid var(--azulTransparente);
  --position: 50%;

  @media (max-width: 425px) {
    width: 100%;
    height: 100%;
  }

  img {
    display: block;
    width: 100%;
  }

  .image-container {
    height: 100%;
  }

  .slider-image {
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

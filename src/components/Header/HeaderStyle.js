import styled from "styled-components";
import headerPortada from "../../assets/portada.jpg";

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 400px;
  position: relative;
  box-shadow: 0 7px 20px var(--azulTransparente);
  animation: aparecerIniciando 1s linear;

  @keyframes aparecerIniciando {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .header_bg {
    width: 100%;
    height: 100%;
    background-image: url(${headerPortada});
    background-position: bottom;
    background-size: cover;
  }

  .header_oscura {
    width: 100%;
    height: 100%;
    background-color: rgba(34, 34, 34, 0.6);
  }
`;

export const ContainerInfo = styled.article`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  max-width: min-content;
  position: absolute;
  top: 10%;
  left: 5%;

  @media (max-width: 425px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    left: 50px;
  }

  span {
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background: var(--azulTransparente);
    color: var(--blanco);
    font-size: 1.8em;
    font-family: "Roboto";

    @media (max-width: 425px) {
      background: transparent;
      text-align: justify;
      font-size: 1.3em;
      padding: 10px;
    }
  }
`;

export const HeaderTitulo = styled.section`
  display: flex;
  gap: 3px;
  align-items: start;

  img {
    width: 250px;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));

    @media (max-width: 425px) {
      width: 150px;
    }
  }

  h1 {
    color: #fff;
    font-size: clamp(3em, 10vw, 5.5em);
    font-weight: 100;
    font-family: "Roboto";
  }
`;

import styled from 'styled-components'
import headerPortada from "../../assets/portada.jpg";

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 1rem;
  border-bottom: 3px solid var(--azulTransparente);
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
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
  position: absolute;
  top: 10%;
  left: 5%;
  max-width: 80vw;

  span {
    width: clamp(300px, 100vw, 550px);
    padding: 10px 20px;
    background: var(--azul);
    color: #fff;
    font-size: 1.5em;
    font-weight: 100;
    border-radius: 10px;
    font-family: 'Roboto_Ligth';
    font-weight: 100;
  }
`;

export const HeaderTitulo = styled.section`
  display: flex;
  gap: 5px;
  align-items: center;

  img {
    width: clamp(100px, 100vw, 200px);
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
  }

  h2 {
    color: #fff;
    font-size: clamp(2.5em, 10vw, 4em);
    font-family: 'Roboto_Ligth';
    font-weight: 100;
  }
`;

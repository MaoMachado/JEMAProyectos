import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: grid;
  place-content: center;
  width: 100%;
  min-height: 150px;
  background-color: var(--azul);

  .info_footer_container {
    display: flex;
    justify-content: space-evenly;
    height: inherit;
    width: 100%;
    max-width: 90vw;
    margin: 0 auto;

    @media (max-width: 450px) {
      flex-direction: column-reverse;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
    }

    .info_container {
      width: 40%;

      @media (max-width: 450px) {
        width: 100%;
      }

      p {
        color: #fff;
        text-align: justify;
        font-family: var(--fuenteParrafo);
        font-size: clamp(1em, 1.2vw, 1.2em);
      }
    }

    .social_container {
      width: 400px;
      display: flex;
      gap: 1rem;
      justify-content: start;
      align-items: center;

      @media (max-width: 450px) {
        justify-content: center;
      }

      a {
        color: #fff;
      }

      img {
        width: 35px;
        height: 35px;
        padding: 5px;
        border-radius: 3px;
        background-color: #fff;
      }
    }
  }
`;

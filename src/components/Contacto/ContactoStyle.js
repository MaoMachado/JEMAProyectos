import styled from "styled-components";

export const ContactoJemaContainer = styled.section`
  display: grid;
  place-content: center;
  width: 100%;
  min-height: 200px;
  padding: 1rem 0;
  background-color: rgba(204, 204, 204, 0.5);

  .contactoContainer {
    display: flex;
    gap: 1.5rem;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    width: clamp(300px, 100vw, 90vw);
    height: 100%;

    @media (max-width: 425px) {
      width: 100%;
      gap: 4rem;
    }

    .infoContacto {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 0 10px;

      @media (max-width: 425px) {
        align-items: center;
        padding: 0 1.5rem;
      }

      h2 {
        color: var(--azul);
        font-size: 2em;
        font-family: "Roboto";
        text-align: center;
      }

      p {
        text-align: justify;
        line-height: 1.5rem;
        font-size: clamp(1.2em, 1.5vw, 1.5em);
        font-family: "Roboto";
        line-height: 2rem;
      }

      .whatsContainer {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        font-size: 1.3em;
        flex-wrap: wrap;
        font-family: "Roboto";

        @media (max-width: 425px) {
          justify-content: center;
        }

        img {
          width: 35px;
        }
      }
    }

    .formContainer {
      flex: 1;
      display: flex;
      gap: 1rem;
      flex-direction: column;
      align-items: center;

      h2 {
        color: var(--azul);
        font-size: 2em;
        text-align: center;
        font-family: var(--fuenteTitulo);
      }
    }
  }
`;

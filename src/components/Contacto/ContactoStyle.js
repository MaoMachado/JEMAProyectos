import styled from 'styled-components'

export const ContactoJemaContainer = styled.section`
  display: grid;
  place-content: center;
  width: 100%;
  min-height: 200px;
  padding: 1rem 0;
  background-color: rgba(204, 204, 204, 0.2);

  .contactoContainer {
    display: flex;
    gap: 1.5rem;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    width: clamp(300px, 100vw, 90vw);
    height: 100%;

    .infoContacto {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 0 10px;

      h2 {
        font-size: 1.5em;
        text-align: center;
      }

      p {
        text-align: justify;
      }

      .whatsContainer {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        font-size: 1.3em;
        flex-wrap: wrap;

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
    }
  }
`;

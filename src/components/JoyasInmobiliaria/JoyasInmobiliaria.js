import styled from "styled-components";

export const JoyasContainer = styled.section`
  width: 90%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  font-family: "Roboto";

  .InfoJoyas {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 425px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    h2 {
      font-size: 3.2em;
      font-family: "Roboto";
      color: var(--azul);
      text-shadow: 0 0 10px rgba(216, 192, 37, 0.4);
    }

    img {
      width: 250px;
      height: 100%;
    }
  }

  .joyas_cards_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    width: 100%;

    @media (max-width: 425px) {
      gap: 1rem;
    }
  }
`;

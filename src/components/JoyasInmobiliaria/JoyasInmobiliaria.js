import styled from "styled-components";

export const JoyasContainer = styled.section`
  width: 90%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  font-family: "Roboto";

  .InfoJoyas {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      text-shadow: 0 0 10px rgba(216, 192, 37, 0.4);
      font-size: 2.5em;
      color: var(--azul);
      padding-bottom: 7px;

      border-bottom: 5px solid var(--blueTransparente);
    }

    img {
      width: 250px;
      height: 100%;
    }
  }

  .joyas_cards_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 100%;
  }
`;

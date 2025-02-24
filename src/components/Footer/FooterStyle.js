import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 100px;
  background-color: var(--azul);

  .info_footer_container {
    display: flex;
    align-items: center;
    height: inherit;
    width: 100%;
    max-width: 90vw;
    margin: 0 auto;

    p {
      flex: 2;
      font-size: clamp(0.8em, 1.2vw, 1.2em);
      color: #fff;
      text-align: justify;
    }

    .social_container {
      flex: 1;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;

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

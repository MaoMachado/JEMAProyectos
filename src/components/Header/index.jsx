import jemaHeader from "../../assets/Jema.png";

import { HeaderContainer, ContainerInfo, HeaderTitulo } from "./HeaderStyle";

export const Header = () => {
  return (
    <HeaderContainer>
      <div className="header_bg">
        <div className="header_oscura"></div>
      </div>
      <ContainerInfo>
        <HeaderTitulo>
          <img src={jemaHeader} alt="JEMA" />
          <h2>Proyectos</h2>
        </HeaderTitulo>
        <span>
          Encontramos, forjamos y entregamos las joyas más valiosas del mercado
          inmobiliario.
        </span>
      </ContainerInfo>
    </HeaderContainer>
  );
};

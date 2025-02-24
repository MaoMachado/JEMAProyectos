import { CardContainer } from "./CardStyle";

export const Card = ({ nombre, img }) => {
  return (
    <CardContainer>
      <img
        className="imgCard"
        src={img}
        alt={`Imagen representativa de ${nombre}`}
      />
      <h3>{nombre}</h3>
    </CardContainer>
  );
};

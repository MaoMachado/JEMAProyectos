import { JoyasCard } from "./JoyasCard";

import { JoyasContainer } from "./JoyasInmobiliaria";

import joya from "../../assets/joya.png";
import colinaPortada from "../../assets/colina1.jpg";
import florestaPortada from "../../assets/portadaCasaJoya.jpg";

const infoJoyas = [
  {
    id: 1,
    img: colinaPortada,
    titulo: "Medellin, La Floresta",
    ubicacion:
      "Casa de 283 M2. Ubicada en uno de los barrios mas exclusivos y tranquilos de Medellín",
  },
  {
    id: 2,
    img: florestaPortada,
    titulo: "Bello, Santa Ana",
    ubicacion:
      "Apto de 54 M2. Ubicada en barrio Santa Ana cerca al parque comercial Fabricatto",
  },
];

export const JoyasInmobiliarias = () => {
  return (
    <JoyasContainer>
      <div className="InfoJoyas">
        <h2>Joyas Inmoviliarias</h2>
        <img src={joya} alt="JOYA Inmoviliaria" />
      </div>
      <article className="joyas_cards_container">
        {infoJoyas.map((item) => {
          return (
            <JoyasCard
              key={item.id}
              img={item.img}
              titulo={item.titulo}
              ubicacion={item.ubicacion}
            />
          );
        })}
      </article>
    </JoyasContainer>
  );
};

import { Card } from "./Card";

import { CardsContainer } from "./CardsStyle";

import imgConstruccion from "../../assets/construccion.jpg";
import imgDiseño from "../../assets/diseñoArquitectonico.jpg";
import imgAsesoria from "../../assets/asesoriaInmobiliaria.jpg";

export const CardsSection = () => {
  const cardsInfo = [
    {
      id: 1,
      nombre: "Construcción",
      img: imgConstruccion,
    },
    {
      id: 2,
      nombre: "Diseño Arquitectónico",
      img: imgDiseño,
    },
    {
      id: 3,
      nombre: "Asesoría Inmobiliaria",
      img: imgAsesoria,
    },
  ];

  return (
    <CardsContainer>
      <header>
        <h2>
          Hemos hecho posible el sueño de familias e inversores con nuestros
          servicios:
        </h2>
      </header>
      <article className="contenedor">
        {cardsInfo.map((card) => {
          return <Card key={card.id} nombre={card.nombre} img={card.img} />;
        })}
      </article>
    </CardsContainer>
  );
};

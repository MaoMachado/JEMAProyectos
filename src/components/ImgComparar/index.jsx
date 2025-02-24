import { useEffect, useRef, useState } from "react";

import {
  ComparedContainer,
  InfoContainerCompared,
  ArticleContainer,
} from "./ImgCompararStyle";

import colinaImgUno from "../../assets/colina1.jpg";
import belloImgDos from "../../assets/portadaCasaJoya.jpg";

export const ImgComparar = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const [position, setPosition] = useState(50);

  const handleInput = (e) => {
    setPosition(e.target.value);
    containerRef.current.style.setProperty("--position", `${e.target.value}%`);
  };

  useEffect(() => {
    const sliderInput = sliderRef.current;
    const container = containerRef.current;

    if (sliderInput && container) {
      const handleInput = (e) => {
        container.style.setProperty("--position", `${e.target.value}%`);
      };

      sliderInput.addEventListener("input", handleInput);

      return () => {
        sliderInput.removeEventListener("input", handleInput);
      };
    }
  }, []);

  return (
    <ComparedContainer>
      <InfoContainerCompared>
        <h2>Observa la transformación</h2>
        <p>
          Cada proyecto es una evolución desde la planificación hasta su
          construcción final. Con esta herramienta de comparación, puedes ver
          los cambios y mejoras en cada etapa del proceso.
        </p>
      </InfoContainerCompared>
      <ArticleContainer ref={containerRef}>
        <div className="image-container">
          <img
            className="image-before slider-image"
            src={colinaImgUno}
            alt="Imagen del proyecto antes de la transformación"
          />
          <img
            className="image-after slider-image"
            src={belloImgDos}
            alt="Imagen del proyecto después de la transformación"
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label="Percentage of before photo shown"
          className="slider"
          onInput={handleInput}
          // readOnly
          // ref={sliderRef}
        />
        <div className="slider-line" aria-hidden="true"></div>
        <div className="slider-button" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="128"
              y1="40"
              x2="128"
              y2="216"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="96"
              y1="128"
              x2="16"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="48 160 16 128 48 96"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
            <line
              x1="160"
              y1="128"
              x2="240"
              y2="128"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="208 96 240 128 208 160"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
          </svg>
        </div>
      </ArticleContainer>
    </ComparedContainer>
  );
};

import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { data } from "../../assets/fotosFloresta/dataImg";

const CarrouselContainer = styled.section`
  width: 100%;
  height: 600px;
  margin: 0 auto;

  @media (max-width: 425px) {
    width: 100%;
    height: 400px;
  }

  ul,
  li {
    list-style: none;
    white-space: nowrap;
  }

  li {
    display: inline;
  }

  img {
    width: 100%;
    height: 600px;
  }

  /* Slider container */
  .slider-container {
    position: relative;
    height: 100%;
  }

  /* dots carrusel */
  .dots-container {
    display: flex;
    justify-content: center;
  }

  .dot-container-item {
    margin: 8px 3px;
    cursor: pointer;
    font-size: 12px;
    text-align: center;
  }

  /* Arrows */
  .leftArrow {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 32px;
    font-size: 50px;
    font-weight: 700;
    color: white;
    filter: drop-shadow(0 0 10px var(--azul));
    z-index: 1;
    cursor: pointer;
  }

  .rightArrow {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 32px;
    font-size: 50px;
    font-weight: 700;
    color: white;
    filter: drop-shadow(0 0 10px var(--azul));
    z-index: 1;
    cursor: pointer;
  }

  .container-images {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
  }

  div.active {
    background: #ccc;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;

export const JoyasCarrousel = () => {
  const listRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direccion) => {
    if (direccion === "prev") {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <CarrouselContainer>
      <div className="slider-container">
        <div
          className="leftArrow"
          onClick={() => {
            scrollToImage("prev");
          }}
        >
          &#10096;
        </div>
        <div
          className="rightArrow"
          onClick={() => {
            scrollToImage("next");
          }}
        >
          &#10097;
        </div>
        <div className="container-images">
          <ul ref={listRef}>
            {data.map((item) => {
              return (
                <li key={item.id}>
                  <img src={item.imgUrl} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="dots-container">
          {data.map((_, idx) => {
            <div
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`dot-container-item ${
                idx === currentIndex ? "active" : ""
              }`}
            >
              &#10084;
            </div>;
          })}
        </div>
      </div>
    </CarrouselContainer>
  );
};

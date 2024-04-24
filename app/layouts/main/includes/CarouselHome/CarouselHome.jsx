'use client'

import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer
} from "react-stacked-center-carousel";
import "./Slide.css";
import { Slide } from "./Slide";

const data = [
  {
    image: `http://${window.location.host}/assets/images/featured/1.jpeg`,
    text: "Finca Koki",
    tour_id: 11
  },
  {
    image: `http://${window.location.host}/assets/images/featured/2.jpeg`,
    text: "Desafío Costa Rica",
    tour_id: 7
  },
  {
    image: `http://${window.location.host}/assets/images/featured/3.jpeg`,
    text: "Ruta de las Mariposas y Café",
    tour_id: 12
  },
  {
    image: `http://${window.location.host}/assets/images/featured/4.jpeg`,
    text: "EcoFinca La Catarata",
    tour_id: 8
  },
  {
    image: `http://${window.location.host}/assets/images/featured/5.jpeg`,
    text: "Ciudad Esmeralda",
    tour_id: 10,
  }
];

export default function CarouselHome(){
  const ref = React.useRef(StackedCarousel);
  return (
    <div style={{ width: "100%", position: "relative" }}>
        <ResponsiveContainer
          carouselRef={ref}
          render={(width, carouselRef) => {
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={250}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
                
              />
            );
          }}
        />
      </div>
  );
};

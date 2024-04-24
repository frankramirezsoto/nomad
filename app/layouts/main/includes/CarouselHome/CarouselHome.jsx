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
    image: "https://picsum.photos/200/300/?random=1",
    text: "hello"
  },
  {
    image: "https://picsum.photos/200/300/?random=12",
    text: "lel"
  },
  {
    image: "https://picsum.photos/200/300/?random=13",
    text: "kak"
  },
  {
    image: "https://picsum.photos/200/300/?random=15",
    text: "kk"
  },
  {
    image: "https://picsum.photos/200/300/?random=10",
    text: "hello"
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

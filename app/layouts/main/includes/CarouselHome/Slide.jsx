'use client'

import React from "react";
import { StackedCarouselSlideProps } from "react-stacked-center-carousel";
import "./Slide.css";

export const Slide = React.memo(function (StackedCarouselSlideProps) {
  const {
    data,
    dataIndex,
    isCenterSlide,
    swipeTo,
    slideIndex
  } = StackedCarouselSlideProps;

  const coverImage = data[dataIndex].image;
  const name = data[dataIndex].name;
  const rating = data[dataIndex].rating;
  const text = data[dataIndex].text;

  return (
    <div className="card-card" draggable={false}>
      <div className={`cover fill ${isCenterSlide ? "off" : "on"}`}>
        <div
          className="card-overlay fill"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div className="detail fill overflow-hidden">
        <div className="description w-full border-2 border-teal-500 rounded-2xl text-black" style={{backgroundImage:`url(${coverImage})`,backgroundPosition:"center",backgroundSize:"350px"}}>
          
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
});

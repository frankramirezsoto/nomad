'use client'

import React from "react";
import { StackedCarouselSlideProps } from "react-stacked-center-carousel";
import "./Slide.css";
import { Box, Flex, Text } from "@chakra-ui/react";

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
  const tour_id = data[dataIndex].tour_id;

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

       <div className="description w-full border-2 border-teal-500 rounded-2xl text-black" style={{backgroundImage:`url(${coverImage})`,backgroundPosition:"center",backgroundSize:"550px"}}>
       <a href={`/navigation/tour/${tour_id}`} target="_blank" className="w-full h-full">
       <Flex alignItems="end" w="100%" h="100%">
            <Text fontWeight="bold" fontSize={17} textColor="teal" align="center" py={5} px={3} backgroundColor="white" w="100%" mb={5}>{text}</Text>
          </Flex>
       </a>
        </div>

      </div>
    </div>
  );
});

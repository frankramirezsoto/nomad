"use client";
import {
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ImageViewer = ({ imageUrls }) => {
  // Correctly destructure imageUrls from props
  const [slideIndex, setSlideIndex] = useState(0);
  const [image, setImage] = useState(imageUrls[0]);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const nextSlide = () => {
    const nextIndex = (slideIndex + 1) % imageUrls.length;
    setSlideIndex(nextIndex);
    setImage(imageUrls[nextIndex]);
  };

  const previousSlide = () => {
    const prevIndex = (slideIndex - 1 + imageUrls.length) % imageUrls.length;
    setSlideIndex(prevIndex);
    setImage(imageUrls[prevIndex]);
  };

  const goToSlide = (index) => {
    setSlideIndex(index);
    setImage(imageUrls[index]);
  };

  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
        <ModalCloseButton color="white"/>
          {image ? <Image
                
                src={image}
                alt="Image"
                objectFit="contain"
              />: null}
        </ModalContent>
      </Modal>
      <section className="mx-auto max-w-2xl">
        <div className="shadow-2xl relative bg-gray-100">
          {image ? (
            <Flex justifyContent="center" minH="450px" maxH="400px" onClick={onOpen} cursor="pointer">
              <img
                className="object-cover"
                src={image}
                alt="Image"
              />
            </Flex>
          ) : null}
          <div className="grid grid-cols-4 lg:grid-cols-5">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                className={`description h-24 ${
                  index === slideIndex ? "opacity-100" : "opacity-50"
                } hover:opacity-100 cursor-pointer`}
                src={url}
                onClick={() => goToSlide(index)}
                alt={`Slide ${index}`}
              />
            ))}
          </div>
          <a
            className="absolute left-0 inset-y-0 flex items-center -mt-32 px-4 text-teal-300 hover:text-teal-100 cursor-pointer text-3xl font-extrabold"
            onClick={previousSlide}
          >
            ❮
          </a>
          <a
            className="absolute right-0 inset-y-0 flex items-center -mt-32 px-4 text-teal-300 hover:text-teal-100 cursor-pointer text-3xl font-extrabold"
            onClick={nextSlide}
          >
            ❯
          </a>
        </div>
      </section>
    </>
  );
};

export default ImageViewer;

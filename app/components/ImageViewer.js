'use client'
import React, { useState } from 'react';

const ImageViewer = ({ imageUrls }) => {  // Correctly destructure imageUrls from props
  const [slideIndex, setSlideIndex] = useState(0);
  const [image, setImage] = useState(imageUrls[0]); 
  console.log(imageUrls);

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
    <section className="mx-auto max-w-2xl">
      <div className="shadow-2xl relative">
        {image ? (
            <div className='max-h-[400px] min-h-[400px] overflow-hidden'>
                <img src={image} alt="Image" className='object-none object-center'/>
            </div>
        ): null}
        <div className="grid grid-cols-4 lg:grid-cols-5">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              className={`description h-24 ${index === slideIndex ? 'opacity-100' : 'opacity-50'} hover:opacity-100 cursor-pointer`}
              src={url}
              onClick={() => goToSlide(index)}
              alt={`Slide ${index}`}
            />
          ))}
        </div>
        <a className="absolute left-0 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold" onClick={previousSlide}>❮</a>
        <a className="absolute right-0 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold" onClick={nextSlide}>❯</a>
      </div>
    </section>
  );
};

export default ImageViewer;

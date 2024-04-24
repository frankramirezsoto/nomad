import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import TourCard from '@/app/navigation/components/TourCard';
import { useState, useEffect } from "react";

export default function TourCarousel () {
    const [tours, setTours] = useState([]);
    const [isLoadingTours, setIsLoadingTours] = useState(true);

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            const tourResponse = await fetch("/api/tours/getAllTours").then(
                (response) => response.json()
            );
            if (tourResponse.data) {
                setTours(tourResponse.data);
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
        } finally {
            setIsLoadingTours(false);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
                <div className="carousel-container" style={{ maxWidth: '800px', width: '100%', padding: '0 20px', maxHeight: '400px' }}>
                    {tours && tours.length > 0 ? (
                        <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={tours.length} visibleSlides={4} step={1} infinite={true}>
                            <div className="w-full relative flex items-center justify-center">
                                <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                                    <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </ButtonBack>
                                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                                    <Slider>
                                        {tours.map((tour, index) => (
                                            <Slide key={index} index={index}>
                                            <div style={{ marginRight: '10px' }}> {/* Espacio entre tarjetas y ancho de tarjetas */}
                                                <TourCard tour={tour} />
                                            </div>
                                        </Slide>
                                        ))}
                                    </Slider>
                                </div>
                                <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="next">
                                    <svg width={11} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </ButtonNext>
                            </div>
                        </CarouselProvider>
                    ) : (
                        <p>No hay tours disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
}


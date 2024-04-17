'use client'
import {
    Flex,
    Box,
    Text,
    Tooltip,
    Badge,
  } from '@chakra-ui/react'
  import { FaLocationDot } from "react-icons/fa6";
  import { useRouter } from 'next/navigation';

export default function TourCard({tour}){

    let tourImage = "";
    let tourRating = 0;
    const router = useRouter();

    !(tour.Images.length === 0) ? (tourImage = `${Buffer.from(tour.Images[0].image.data)
        .toString("base64")
        .replace("data", "data:")
        .replace("base64", ";base64,")
        .replace(/=/g, "")}`) : null;


     // Function to calculate the average rating
     const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return total / reviews.length;
    };

    // Calculate tour rating if reviews exist
    if (tour.Reviews) {
        tourRating = calculateAverageRating(tour.Reviews);
    }
    return(
      <Box
        onClick={() => router.push(`/navigation/tour/${tour.tour_id}`)}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        sx={{ transition: "transform 0.3s ease-in-out" }}
          _hover={{ transform: "scale(1.1)", cursor:"pointer" }}
          >
        <Box className='min-h-52 max-h-52 overflow-hidden' style={{backgroundImage:`url(${tourImage})`,backgroundPosition:"center",backgroundSize:"cover"}} />
        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="teal" position="absolute" top={2} right={2}></Badge>
        <Box p="6">
        <Flex justify="start" alignItems="center" className='text-xs text-gray-500' mt={2}><span><FaLocationDot className='text-gray-500 me-2'/></span> <span>{tour.canton}, {tour.province}</span></Flex>
            <Tooltip label={tour.name}><Text fontSize={17} fontWeight="bold" minH={50} maxH={50} noOfLines={2}>{tour.name}</Text></Tooltip>
            <Flex justifyContent="space-between">
                <Box>
                    
                </Box>
            </Flex>
        </Box>
      </Box>
    )
}
'use client'
import {
    Flex,
    Box,
    Text,
    Tooltip,
    Badge,
  } from '@chakra-ui/react'
  import { FaLocationDot } from "react-icons/fa6";
  import Rating from '@/app/components/Rating';
  import { useRouter } from 'next/navigation';

export default function BusinessCard({business}){

    let businessImage = "";
    let businessRating = 0;
    const router = useRouter();

    !(business.Images.length === 0) ? (businessImage = `${Buffer.from(business.Images[0].image.data)
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

    // Calculate business rating if reviews exist
    if (business.Review) {
        businessRating = calculateAverageRating(business.Review);
    }
    return(
      <Box
        onClick={() => router.push(`/navigation/business/${business.business_id}`)}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        sx={{ transition: "transform 0.3s ease-in-out" }}
          _hover={{ transform: "scale(1.1)", cursor:"pointer" }}
          >
        <Box className='min-h-52 max-h-52 overflow-hidden' style={{backgroundImage:`url(${businessImage})`,backgroundPosition:"center",backgroundSize:"cover"}} />
        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="teal" position="absolute" top={2} right={2}>{business.BusinessTypes.name}</Badge>
        <Box p="6">
            <Rating rating={businessRating} numReviews={business.Review ? business.Review.length : 0}/>
            <Tooltip label={business.name}><Text fontSize={17} fontWeight="bold" minH={50} maxH={50} noOfLines={2}>{business.name}</Text></Tooltip>
            <Flex justify="start" alignItems="center" className='text-xs text-gray-500' mt={2}><span><FaLocationDot className='text-gray-500 me-2'/></span> <span>{business.canton}, {business.province}</span></Flex>
        </Box>
      </Box>
    )
}
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
  import {  BsStarFill } from 'react-icons/bs'

export default function TourCard({tour}){

    let tourImage = "";
    let tourRating = 0;
    const router = useRouter();
    console.log(tour)

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
    if (tour.Review) {
        tourRating = calculateAverageRating(tour.Review);
    }
    //Function to calculate discounted price
    function calculateDiscountedPrice(price, discountPercent) {
        if (discountPercent < 0 || discountPercent > 100) {
            throw new Error("Invalid discount percentage. Must be between 0 and 100.");
        }
        return price * (1 - (discountPercent / 100));
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
        <Badge px="2" fontSize="0.8em" colorScheme="green" position="absolute" top={0} right={0}>{tour.discount ? `DISCOUNT: ${tour.discount}%`:null}</Badge>
        <Box p="6">
        <Flex justify="start" alignItems="center" className='text-xs text-gray-500' mt={2}><span><FaLocationDot className='text-gray-500 me-2'/></span> <span>{tour.canton}, {tour.province}</span></Flex>
            <Tooltip label={tour.name}><Text fontSize={17} fontWeight="bold" minH={50} maxH={50} noOfLines={2}>{tour.name}</Text></Tooltip>
            <Flex justifyContent="space-between" alignItems="end">
                <Box>
                    <Flex alignItems="center">
                    <BsStarFill
                        style={{ marginLeft: '1' }}
                        className='text-yellow-500' 
                        />
                        <p class="ms-2 text-sm font-bold text-gray-900">{tourRating}</p>
                    </Flex>
                    <Text color="gray.500" fontSize={13} mt={2}>
                        {tour.Review.length > 0 ? tour.Review.length : "No "} reviews
                        </Text>
                </Box>
                <Box>
                    {tour.discount ? (
                        <>
                        <Flex>
                        <Text as='del' fontSize={13} me={1}>${tour.price_person}</Text>
                            <Text fontSize={20} fontWeight="bold" >${calculateDiscountedPrice(tour.price_person,tour.discount)}</Text>
        
                        </Flex>
                        <Text fontSize={12} color="gray.500" textAlign="end">per person</Text>
                        </>
                    ):(
                        <>
                        <Text fontWeight="bold" fontSize={20} textAlign="end">${tour.price_person}</Text>
                        <Text fontSize={12} color="gray.500" textAlign="end">per person</Text>
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
      </Box>
    )
}
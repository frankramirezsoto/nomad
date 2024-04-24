"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
  Portal,
  Box,
  Text,
  Card,
  CardBody,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "@/app/context/AuthContext";
import { FaHiking } from "react-icons/fa";
import Lottie from "lottie-react";
import walkAnimation from "@/public/assets/images/animation-walk.json";
import ItineraryDisplay from "@/app/components/ItineraryDisplay";

function ItineraryCart() {
  const { user } = useAuth();

  

  return (
    <Popover>
      <PopoverTrigger>
        <button className="bg-white p-3 px-4 rounded-full me-3">
          <FaHiking className="text-black text-3xl" />
        </button>
      </PopoverTrigger>
      <Portal>
        {!user ? (
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Box>
                <Lottie animationData={walkAnimation} className="h-[150px]" />
              </Box>
              <Text align="center" fontWeight="bold" p={3}>
                Login now to create an itinerary at the best places in Costa
                Rica!
              </Text>
            </PopoverBody>
          </PopoverContent>
        ) : (
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <ItineraryDisplay />
              <Flex justifyContent="end">
                <a href="/checkout" className="bg-teal-700 text-white font-bold py-3 px-4 rounded-full hover:bg-teal-600" target="_blank">Checkout</a>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        )}
      </Portal>
    </Popover>
  );
}

export default ItineraryCart;

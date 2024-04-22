'use client'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Portal,
  Box,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@/app/context/AuthContext";
import { FaHiking } from "react-icons/fa";
import Lottie from "lottie-react";
import walkAnimation from "@/public/assets/images/animation-walk.json"

function ItineraryCart() {
  const { user } = useAuth();

  return (
    <Popover>
      <PopoverTrigger>
        <button className="bg-white p-3 px-4 rounded-full me-3">
        <FaHiking className="text-black text-3xl"/>
        </button>
      </PopoverTrigger>
      <Portal>
        {!user ?
          <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Box>
              <Lottie animationData={walkAnimation} className="h-[150px]"/>
            </Box>
            <Text align="center" fontWeight="bold" p={3}>Login now to create an itinerary at the best places in Costa Rica!</Text>
          </PopoverBody>
        </PopoverContent>
        :
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <p>CART INFO</p>
          </PopoverBody>
        </PopoverContent>
        }
      </Portal>
    </Popover>
  );
}

export default ItineraryCart;

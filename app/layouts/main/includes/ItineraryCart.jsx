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
} from "@chakra-ui/react";
import { useAuth } from "@/app/context/AuthContext";
import { FaHiking } from "react-icons/fa";

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
            <p>Login to create an itinerary at the best places in Costa Rica!</p>
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

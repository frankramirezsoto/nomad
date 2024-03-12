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

function ItineraryCart() {
  return (
    <Popover>
      <PopoverTrigger>
        <button className="bg-white p-3 px-4 rounded-full me-3">
        CART
        </button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button>Button</Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default ItineraryCart;

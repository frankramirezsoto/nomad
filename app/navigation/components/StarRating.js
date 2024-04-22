import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Text, HStack, Box } from "@chakra-ui/react";

export default function StarRating({ rating, setRating, size }) {

  const [hover, setHover] = useState(null);
  return (
    <HStack spacing={"2px"}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar
                onClick={() => setRating(ratingValue)}
              cursor={"pointer"}
              size={size || 20}
              transition="color 200ms"
            />
          </Box>
        );
      })}
      <Text ms={4}>Rating: {rating}</Text>
    </HStack>
  );
}
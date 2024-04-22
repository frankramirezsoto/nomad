import { FaStar } from "react-icons/fa";
import { Text, HStack, Box } from "@chakra-ui/react";

export default function StarRatingDisplay({ rating, size }) {

  return (
    <HStack spacing={"2px"}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          >
            <FaStar
              size={size || 20}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
}
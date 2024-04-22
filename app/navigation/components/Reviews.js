import React, { useState } from "react";
import {
  Box,
  Button,
  Textarea,
  useToast,
  Flex,
  Text,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "@/app/context/AuthContext";
import StarRating from "./StarRating";
import StarRatingDisplay from "./StarRatingDisplay";

export default function Reviews({ reviews, id, type }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [allReviews, setAllReviews] = useState(reviews || []); // Initialize with existing reviews
  const toast = useToast();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    const body = {
      rating,
      comment,
      user_id: user.user_id, // Assume user_id is available or fetched from context/global state
      [`${type}_id`]: id,
    };

    try {
      const response = await fetch("/api/reviews/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const newReview = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: "Review added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAllReviews((prevReviews) => [...prevReviews, newReview.data]); // Add the new review to the state
        setComment("");
        setRating(1); // Reset the rating
      } else {
        throw new Error(newReview.message || "Failed to add review");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Reviews</DrawerHeader>

          <DrawerBody>
            {allReviews.map((review) => (
              <Card
                key={review.review_id}
                p={1}
                variant="filled"
                colorScheme="gray"
                mb={3}
              >
                <CardBody>
                  <Flex position="column">
                    <Text fontWeight="bold" me={3}>
                      @{review.User?.first_name || user.first_name}
                    </Text>
                    <StarRatingDisplay rating={review.rating} size={15} />
                  </Flex>
                  <Text fontSize="sm">{review.comment}</Text>
                </CardBody>
              </Card>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Box p={5} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Box>
          {user ? (
            <Card>
              <CardBody>
                <Text mb={3}>
                  Hey, {user ? user.first_name : null}! leave a review for this{" "}
                  {type}
                </Text>
                <StarRating rating={rating} setRating={setRating} size={20} />
                <Textarea
                  placeholder="Comment... (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  mt={3}
                />
                <Button onClick={handleSubmit} mt={3} colorScheme="teal">
                  Submit Review
                </Button>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <Text align="center">Login now to leave a review...</Text>
              </CardBody>
            </Card>
          )}
        </Box>

        {/* Render the list of reviews */}
        <Box>
          {allReviews.length == 0 ? (
            <Card mb={3}>
              <CardBody>
                <Text>
                  There's no reviews for this {type}... be the first to leave
                  one
                </Text>
              </CardBody>
            </Card>
          ) : (
            <>
              {allReviews.slice(0, 3).map((review) => (
                <Card
                  key={review.review_id}
                  p={1}
                  variant="filled"
                  colorScheme="gray"
                  mb={3}
                >
                  <CardBody>
                    <Flex position="column">
                      <Text fontWeight="bold" me={3}>
                        @{review.User?.first_name || user.first_name}
                      </Text>
                      <StarRatingDisplay rating={review.rating} size={15} />
                    </Flex>
                    <Text fontSize="sm">{review.comment}</Text>
                  </CardBody>
                </Card>
              ))}
            </>
          )}
          {allReviews.length > 3 ? (
            <Button colorScheme="teal" onClick={onOpen}>
              View All Reviews
            </Button>
          ) : null}
        </Box>
      </Box>
    </>
  );
}

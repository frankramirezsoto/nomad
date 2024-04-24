"use client";
import {
  useToast,
  Box,
  Card,
  CardBody,
  Text,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function ItineraryDisplay() {
  const { user, reloadItinerary, setReloadItinerary } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  //Toast for notifications
  const toast = useToast();
  //Effect to fetch itineraries
  useEffect(() => {
    if (user) {
      const fetchCartItemsByUserId = async (userId) => {
        try {
          const response = await fetch(
            `/api/itinerary/getAllByUserId?user_id=${userId}`
          );
          const data = await response.json();
          setItineraries(data.data);
          console.log(data.data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };
      const userId = user.user_id;
      fetchCartItemsByUserId(userId);
    }
  }, [user, reloadItinerary]);
  //Function to transform ISODATE into a readable date
  function getDateAndTime(date) {
    // Format the date and time
    const formattedDate = date
      .toLocaleString("en-US", {
        month: "numeric", // numeric, 2-digit
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        hour: "numeric", // numeric, 2-digit, 24-hour
        minute: "numeric", // numeric, 2-digit
        hour12: true, // Use 12-hour format
      })
      .replace(",", " at")
      .toLowerCase(); // Customize the output to match the desired format

    return formattedDate;
  }

  // Function to handle itinerary deletion
  const handleDelete = async (itineraryId) => {
    try {
      const response = await fetch("/api/itinerary/deleteItinerary", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itinerary_id: itineraryId }),
      });

      if (response.ok) {
        reloadItinerary ? setReloadItinerary(false) : setReloadItinerary(true);
        toast({
          title: "Deleted item from itinerary.",
          duration: 5000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      } else {
        // Handle error - e.g., show an error toast
        console.log("Error deleting business:");
      }
    } catch (error) {
      console.error("Error deleting business:", error);
      // Handle error - e.g., show an error toast
      toast({
        title: "Failed to delete itinerary item",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "top-right",
      });
    }
  };

  //Function to calculate discounted price
  function calculateDiscountedPrice(price, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error("Invalid discount percentage. Must be between 0 and 100.");
    }
    return price * (1 - (discountPercent / 100));
}
  return (
    <>
      {itineraries.map((itinerary) => {
        return (
          <Skeleton isLoaded={!loading}>
            <Card mb={3}>
              <CardBody>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Flex direction='row'>
                    <Text fontSize={14} fontWeight="bold" me={3}>
                      x{itinerary.assistants}
                    </Text>
                    <Box>
                      <a
                        className="hover:text-teal-500"
                        href={`/navigation/tour/${itinerary.Tour.tour_id}`}
                        target="_blank"
                      >
                        <Text fontSize={14}>{itinerary.Tour.name}</Text>
                      </a>
                      <Text fontSize={14} color="gray.400">
                        {getDateAndTime(new Date(itinerary.tour_datetime))}
                      </Text>
                      <Text fontSize={14} color="gray.700">
                        Total: $
                        {itinerary.Tour.discount ? (
                          calculateDiscountedPrice(itinerary.Tour.price_person, itinerary.Tour.discount)
                        ):(
                          itinerary.Tour.price_person * itinerary.assistants
                        )}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <TiDelete
                      onClick={() => handleDelete(itinerary.itinerary_id)}
                      className="cursor-pointer"
                      color="red"
                      size={30}
                    ></TiDelete>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </Skeleton>
        );
      })}
    </>
  );
}

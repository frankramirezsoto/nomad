"use client";

import MainLayout from "@/app/layouts/main/MainLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useToast,
  Box,
  Skeleton,
  SkeletonText,
  Text,
  Divider,
  List,
  ListItem,
  ListIcon,
  Flex,
  Container,
  Card,
  CardBody,
  InputGroup,
  Input,
  InputLeftElement,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import ImageViewer from "@/app/components/ImageViewer";
// import LocationSelectorMap from "@/app/components/LocationSelectorMap";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Reviews from "../../components/Reviews";
import { IoTimeSharp } from "react-icons/io5";
import { FaHiking } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import AccessBtn from "@/app/layouts/main/includes/AccessBtn";
import dynamic from 'next/dynamic';
const LocationSelectorMap = dynamic(() => import('@/app/components/LocationSelectorMap'), {
  ssr: false
});

export default function Tour({ params }) {
  //Gets Tour Id from param
  const tourId = params.id;
  //Gets Router to be used
  const router = useRouter();
  //Gets toast to be used
  const toast = useToast();
  //Gets user if logged
  const { user, reloadItinerary, setReloadItinerary } = useAuth();
  //This hook is used to stored the tour obtained by the DB
  const [tour, setTour] = useState({
    b_user_id: "",
    name: "",
    short_description: "",
    full_description: "",
    address: "",
    district: "",
    canton: "",
    province: "",
    latitude: "",
    longitude: "",
    price_person: "",
    discount: "",
    discount_start: "",
    discount_end: "",
    days_operation: "0000000",
    operates_from: "",
    operates_to: "",
    phone_number: "",
  });

  //Hook to save the paths of the saved images
  const [images, setImages] = useState([]);
  //Const to handle loading state
  const [loading, setLoading] = useState(true);

  //States for the Itinerary & Reservation fields
  const [tourDateTime, setTourDateTime] = useState("");
  const [assistants, setAssistants] = useState(1);

  //Function to post add Itinerary
  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const itineraryData = {
      user_id: user.user_id,
      tour_id: tourId,
      tour_datetime: tourDateTime,
      assistants: assistants,
    };

    try {
      const response = await fetch("/api/itinerary/addItineraryItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itineraryData),
      });

      if (!response.ok) {
        toast({
          title: `Must select a date, time and number of assistants`,
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      } else {
        reloadItinerary ? setReloadItinerary(false) : setReloadItinerary(true);
        toast({
          title: `We hope you enjoy ${tour.name}!`,
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: `Failed to add item to the itinerary.`,
        duration: 9000,
        isClosable: true,
        status: "error",
        position: "top-right",
      });
      throw error;
    }
  };

  //Fetch the Tour Info from the DB
  useEffect(() => {
    const fetchTourById = async () => {
      try {
        const response = await fetch(
          `/api/tours/getTourById?tour_id=${tourId}`
        );
        const data = await response.json();
        setTour(data.data);
        var imageUrls = data.data.Images.map((image) => {
          return `${Buffer.from(image.image.data)
            .toString("base64")
            .replace("data", "data:")
            .replace("base64", ";base64,")
            .replace(/=/g, "")}`;
        });
        setImages(imageUrls);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching tour:", error);
      }
    };

    if (tourId) {
      fetchTourById();
    }
  }, [tourId]);

  function describeDays(days) {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let ranges = [];
    let startIndex = null;
    let endIndex = null;

    // Check for all days operation scenario
    if (days === "1111111") {
      return "daily";
    }
    if (days === "1000001") {
      return "on weekends";
    }

    // Parse the binary string to find ranges and standalone days
    for (let i = 0; i < days.length; i++) {
      if (days[i] === "1") {
        if (startIndex === null) {
          startIndex = i; // Start of a new range
        }
        endIndex = i; // End of the current range
      } else {
        if (startIndex !== null) {
          // We have completed a range
          if (startIndex === endIndex) {
            ranges.push(dayNames[startIndex]); // Single day range
          } else {
            ranges.push(dayNames[startIndex] + " to " + dayNames[endIndex]); // Multiple day range
          }
          startIndex = null;
          endIndex = null;
        }
      }
    }

    // Handle last range if ends at the string end
    if (startIndex !== null) {
      if (startIndex === endIndex) {
        ranges.push(dayNames[startIndex]);
      } else {
        ranges.push(dayNames[startIndex] + " to " + dayNames[endIndex]);
      }
    }

    return ranges.join(", ");
  }

  return (
    <MainLayout>
      <Skeleton isLoaded={!loading}>
        <Box
          className="h-[50vh]"
          style={{
            backgroundImage: `url(${images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            className="h-[50vh]"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box className="p-5 bg-white rounded-lg" maxWidth="75%">
              <Text
                className="text-center text-teal-700 mb-6"
                fontSize={30}
                fontWeight="bold"
              >
                {tour ? tour.name : null}
              </Text>
              <Text className="text-center text-teal-700" fontSize={15}>
                {tour ? tour.short_description : null}
              </Text>
            </Box>
          </Box>
        </Box>
      </Skeleton>

      <Container maxW="85vw" p={5} fontSize={17}>
        <Box className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-8">
          {/* Renders ImageViewer */}
          <Box className="col-span-2">
            <Skeleton isLoaded={!loading} mb={3}>
              <Box className="min-h-52">
                {!loading ? <ImageViewer imageUrls={images} /> : null}
              </Box>
            </Skeleton>
            {loading ? (
              <SkeletonText
                mt="4"
                noOfLines={15}
                spacing="4"
                skeletonHeight="2"
              />
            ) : (
              <Box py={30}>
                <Text mb={3}>{tour ? tour.full_description : null}</Text>
              </Box>
            )}
          </Box>
          <Box>
            <Skeleton isLoaded={!loading} mb={3}>
              <LocationSelectorMap
                initialLat={tour ? tour.latitude : null}
                initialLng={tour ? tour.longitude : null}
                className="my-3"
              />
            </Skeleton>
            <Skeleton isLoaded={!loading} mb={3}>
              <Divider mb={3} />

              {tour ? (
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaLocationDot} color="teal.500" />
                    {tour.address}, {tour.district}, {tour.canton},{" "}
                    {tour.province}, Costa Rica
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCalendarCheck} color="teal.500" />
                    Operates {describeDays(tour.days_operation)}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdAccessTimeFilled} color="teal.500" />
                    Open from {tour.operates_from} to {tour.operates_to}
                  </ListItem>
                  {tour.phone_number ? (
                    <ListItem>
                      <ListIcon as={FaPhone} color="teal.500" />
                      {tour.phone_number}
                    </ListItem>
                  ) : null}
                </List>
              ) : null}
            </Skeleton>
            <Skeleton isLoaded={!loading} mb={3}>
              <Box w="full" mt={5}>
                <Card>
                  <CardBody>
                    <Flex justifyContent="center" mb={3}>
                      <Text
                        fontWeight="bold"
                        fontSize={20}
                        mb={3}
                        className="border-b-4 border-teal-500"
                      >
                        Reserve your spot!
                      </Text>
                    </Flex>
                    <Box>
                      <FormControl mb={3} isRequired>
                        <FormLabel>Date & Time of reservation</FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <IoTimeSharp color="teal.300" />
                          </InputLeftElement>
                          <Input
                            type="datetime-local"
                            value={tourDateTime}
                            onChange={(e) => setTourDateTime(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mb={3} isRequired>
                        <FormLabel>Number of assistants</FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <IoTimeSharp color="teal.300" />
                          </InputLeftElement>
                          <Input
                            type="number"
                            value={assistants}
                            onChange={(e) => setAssistants(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      {user ? (
                        <>
                          <Button
                            w="full"
                            py={5}
                            rounded="full"
                            colorScheme="green"
                            fontSize="lg"
                            mb={3}
                            onClick={handleAddSubmit}
                          >
                            Add to my itinerary
                          </Button>
                          <Button
                            w="full"
                            py={5}
                            rounded="full"
                            colorScheme="teal"
                            fontSize="lg"
                          >
                            Reserve Now!
                          </Button>
                        </>
                      ) : (
                        <>
                          <Text
                            fontWeight="bold"
                            color="teal"
                            fontSize={15}
                            align="center"
                            mb={3}
                          >
                            Login now to reserve your spot at{" "}
                            {tour ? tour.name : null}
                          </Text>
                          <Flex justifyContent="center" color="white">
                            <AccessBtn>Login</AccessBtn>
                            <AccessBtn>Register</AccessBtn>
                          </Flex>
                        </>
                      )}
                    </Box>
                  </CardBody>
                </Card>
              </Box>
            </Skeleton>
          </Box>
        </Box>

        <Box className="col-span-3">
          {loading ? (
            <></>
          ) : (
            <>
              <Flex justifyContent="center">
                <Text
                  fontWeight="bold"
                  fontSize={25}
                  mb={3}
                  className="border-b-4 border-teal-500"
                >
                  Reviews
                </Text>
              </Flex>
              <Reviews reviews={tour.Review} id={tourId} type="tour" />
            </>
          )}
        </Box>
      </Container>
    </MainLayout>
  );
}

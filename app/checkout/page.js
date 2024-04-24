"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import MainLayout from "../layouts/main/MainLayout";
import {
  useToast,
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  Flex,
  Container,
  FormControl,
  Input,
  FormLabel,
  Button,
  Textarea,
} from "@chakra-ui/react";
import ItineraryDisplay from "../components/ItineraryDisplay";
import Logo from "../components/Logo";
import ProcessingPayment from "../components/ProcessingPayment";

export default function Checkout() {
  //Gets props from Authetication Provider
  const { user, reloadItinerary, setReloadItinerary } = useAuth();
  //State to store itineraties, used to calculate total amount
  const [itineraries, setItineraries] = useState([]);
  //State for the total amount
  const [total, setTotal] = useState(0);
  //To handle loading of the page
  const [loading, setLoading] = useState(false);
  //Router to redirect
  const router = useRouter();
  //Toast to push a notification
  const toast = useToast();
  //State for Reservation Data
  const [reservation, setReservation] = useState({
    user_id: user?.user_id,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    reservation_comment: "",
  });

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
        }
      };
      const userId = user.user_id;
      fetchCartItemsByUserId(userId);
    } 
  }, [user, reloadItinerary]);

  useEffect(() => {
    setTotal(0);
    let total = 0;
    itineraries &&
      itineraries.map((itinerary) => {
        let price_person = 0;
        itinerary.Tour.discount
          ? (price_person = calculateDiscountedPrice(
              itinerary.Tour.price_person,
              itinerary.Tour.discount
            ))
          : (price_person = itinerary.Tour.price_person);
        const assistants = itinerary.assistants;
        const price = price_person * assistants;
        total += price;
      });
    setTotal(total);
  }, [itineraries, reloadItinerary]);

  //Handler for the states of the Form Data variables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prevState) => ({ ...prevState, [name]: value }));
  };

  //Function to calculate discounted price
  function calculateDiscountedPrice(price, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error(
        "Invalid discount percentage. Must be between 0 and 100."
      );
    }
    return price * (1 - discountPercent / 100);
  }

  //Function to handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservation: reservation,
          itineraries: itineraries,
          total: total,
        }),
      });

      if (response.ok) {
        router.push("/account/myReservations");
        toast({
          title: `Thankyour for your reservation! We hope you enjoy your adventure!`,
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      } else {
        toast({
          title: "Failed to add business.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to add business.",
        duration: 9000,
        isClosable: true,
        status: "error",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainLayout>
      {loading ? <ProcessingPayment></ProcessingPayment> : null}
      <Container maxW="85vw" my={10}>
        <Flex justifyContent="center" mb={3}>
          <Text
            fontWeight="bold"
            fontSize={30}
            mb={3}
            className="border-b-4 border-teal-500"
          >
            Checkout
          </Text>
        </Flex>
        {user && itineraries.length > 0 ? (
          <Box className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Box>
              <Card>
                <CardBody>
                  <Text align="center" fontWeight="bold" mb={5}>
                    My Upcoming Tours
                  </Text>
                  <ItineraryDisplay />
                  <Text align="end" mt={5} fontWeight="bold">
                    Total: ${total}
                  </Text>
                </CardBody>
              </Card>
            </Box>

            <Box className="col-span-2">
              <Card backgroundColor="teal.600" textColor="white">
                <CardHeader h="20vh" className="bg-random overflow-hidden">
                  <Flex
                    h="20vh"
                    className="backdrop-contrast-50"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Logo className></Logo>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text fontWeight="bold" fontSize={20} align="center" mb={5}>
                    We're exicted for your next adventure!
                  </Text>
                  <Text fontSize={15} align="center">
                    Fill out the following fields to reserve your place
                  </Text>

                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-5" mt={5}>
                    {/* First Name */}
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        id="first_name"
                        name="first_name"
                        backgroundColor="white"
                        textColor="black"
                        value={reservation.first_name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {/* Last Name */}
                    <FormControl isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        id="last_name"
                        name="last_name"
                        backgroundColor="white"
                        textColor="black"
                        value={reservation.last_name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {/* Email */}
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        backgroundColor="white"
                        textColor="black"
                        value={reservation.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {/* Phone */}
                    <FormControl isRequired>
                      <FormLabel>Phone</FormLabel>
                      <Input
                        id="phone"
                        name="phone"
                        backgroundColor="white"
                        textColor="black"
                        value={reservation.phone}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                  <Text fontWeight="bold" fontSize={20} align="center" my={5}>
                    Payment Information
                  </Text>
                  <Box className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Card Number */}
                    <FormControl isRequired className="col-span-2">
                      <FormLabel>Card Number</FormLabel>
                      <Input
                        type="number"
                        id="card_number"
                        name="card_number"
                        backgroundColor="white"
                        textColor="black"
                      />
                    </FormControl>

                    {/* CVV*/}
                    <FormControl isRequired className="col-span-1">
                      <FormLabel>CVV</FormLabel>
                      <Input
                        type="number"
                        id="cvv"
                        name="cvv"
                        backgroundColor="white"
                        textColor="black"
                      />
                    </FormControl>

                    {/* Expiration*/}
                    <FormControl isRequired className="col-span-1">
                      <FormLabel className="text-nowrap">Expiration</FormLabel>
                      <Input
                        type="date"
                        id="expiration"
                        name="expiration"
                        backgroundColor="white"
                        textColor="black"
                      />
                    </FormControl>

                    {/* CARD HOLDER*/}
                    <FormControl isRequired className="col-span-2">
                      <FormLabel>Card Holder</FormLabel>
                      <Input
                        id="holder"
                        name="holder"
                        backgroundColor="white"
                        textColor="black"
                      />
                    </FormControl>
                  </Box>
                  {/* Additional Comment */}
                  <FormControl mt={5}>
                    <FormLabel>Additional comments</FormLabel>
                    <Textarea
                      id="reservation_comment"
                      name="reservation_comment"
                      backgroundColor="white"
                      textColor="black"
                      value={reservation.reservation_comment}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button
                    w="full"
                    mt={5}
                    backgroundColor="teal.200"
                    _hover={{ backgroundColor: "teal.400", textColor: "white" }}
                    textColor="teal"
                    rounded="full"
                    py={8}
                    fontSize="xl"
                    onClick={handleSubmit}
                  >
                    Reserve Now!
                  </Button>
                </CardBody>
              </Card>
            </Box>
          </Box>
        ) : (
            <Flex minH="60vh" justifyContent="center" alignItems="center">
                <Flex direction='column'>
                    <Text fontSize={25} fontWeight='bold' align='center'>It looks like you have no items on your Itinerary!</Text>
                    <Text fontSize={20} align='center'>Start navigating to find your next adventure!</Text>
                    <Button
                  onClick={() => router.push("/navigation")}
                  colorScheme="teal"
                  mt={5}
                  rounded="full"
                  shadow="dark-lg"
                  px={12}
                  py={8}
                  fontSize="lg"
                >
                  Find your next adventure! 
                </Button>
                </Flex>
            </Flex>
        )}
      </Container>
    </MainLayout>
  );
}

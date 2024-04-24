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
  Text,
  Flex,
  Container,
  FormControl,
  Input,
  FormLabel,
  Skeleton,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import ItineraryDisplay from "../components/ItineraryDisplay";

export default function Checkout() {
  //Gets user from context
  const { user } = useAuth();
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
  });

  //Handler for the states of the Form Data variables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <MainLayout>
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
        {user ? (
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Box>
              <Card>
                <CardBody>
                  <Text align="center" fontWeight="bold" mb={5}>
                    My Upcoming Tours
                  </Text>
                  <ItineraryDisplay />
                </CardBody>
              </Card>
            </Box>

            <Box className="col-span-2">
              <Card backgroundColor="teal.600" textColor="white">
                <CardBody>
                  <Text fontWeight="bold" fontSize={20} align="center" mb={5}>
                    We're exicted for your next adventure!
                  </Text>
                  <Text fontSize={15} align="center">
                    Fill out the following fields to reserve your place
                  </Text>

                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-5" mt={5}>
                    {/* First Name */}
                  <FormControl isRequired >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      backgroundColor="white"
                      value={reservation.first_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  {/* Last Name */}
                  <FormControl isRequired >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      backgroundColor="white"
                      value={reservation.last_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  {/* Email */}
                  <FormControl isRequired >
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                      backgroundColor="white"
                      value={reservation.last_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  {/* Phone */}
                  <FormControl isRequired >
                    <FormLabel>Phone</FormLabel>
                    <Input
                      backgroundColor="white"
                      value={reservation.phone}
                      onChange={handleChange}
                    />
                  </FormControl>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          </Box>
        ) : null}
      </Container>
    </MainLayout>
  );
}

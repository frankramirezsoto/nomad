"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "@/app/layouts/main/MainLayout";
import {
  Card,
  CardBody,
  Container,
  Flex,
  Text,
  Box,
  Image,
  Divider,
  useToast,
  Button,
} from "@chakra-ui/react";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";

export default function MyReservations() {
  //Gets user from Authetication Provider
  const { user } = useAuth();
  //State for the reservations
  const [reservations, setReservations] = useState([]);
  console.log(reservations);
  //State for loading the reservations
  const [loading, setLoading] = useState(true);
  //Router
  const router = useRouter();
  //Toast
  const toast = useToast();

  useEffect(() => {
    if (user) {
      const fetchReservationsByUserId = async (userId) => {
        try {
          const response = await fetch(
            `/api/reservations/getAllByUserId?user_id=${userId}`
          );
          const data = await response.json();
          setReservations(sortReservationsByDate(data.data));
          console.log(data.data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };
      const userId = user.user_id;
      fetchReservationsByUserId(userId);
    } 
  }, [user]);
  //Function to sorth the reservations by date
  const sortReservationsByDate = (reservations) => {
    return reservations.sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.order_datetime);
      const dateB = new Date(b.order_datetime);

      return dateA - dateB; // Ascending order
    });
  };

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

  return (
    <MainLayout>
      <Container maxW="85vw" minH="90vh">
        <Flex justifyContent="center" my={5}>
          <Text
            fontWeight="bold"
            fontSize={30}
            className="border-b-4 border-teal-500"
          >
            My Reservations
          </Text>
        </Flex>
        {user ? (
          loading ? (
            <Loading/>
          ):(
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reservations.length > 0 ?
              reservations.map((reservation) => (
                <Box>
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    colorScheme="teal"
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={`${Buffer.from(reservation.Tour.Images[0].image.data)
                        .toString("base64")
                        .replace("data", "data:")
                        .replace("base64", ";base64,")
                        .replace(/=/g, "")}`}
                      alt="Caffe Latte"
                    />
                    <CardBody>
                      <a
                        href={`/navigation/tour/${reservation.tour_id}`}
                        target="_blank"
                      >
                        <Text
                          fontWeight="bold"
                          fontSize={17}
                          className="hover:text-teal-500"
                        >
                          {reservation.Tour.name}
                        </Text>
                      </a>
                      <Text fontSize={12} textColor="gray.500">Order placed: {getDateAndTime(new Date(reservation.reservation_datetime))}</Text>
                      <Divider my={3}/>
                      <Text
                          fontWeight="bold"
                          fontSize={14}
                          align="center"
                          mb={3}
                        >
                          Tour Details
                        </Text>
                      <Text fontSize={14} textColor="gray.500">Date & Time: {getDateAndTime(new Date(reservation.order_datetime))}</Text>
                      <Text fontSize={14} textColor="gray.500">Number of assistants: {reservation.assistants}</Text>
                      <Text fontSize={14} textColor="gray.500">Total paid: ${reservation.total}</Text>
                    </CardBody>
                  </Card>
                </Box>
              )):(
                <Flex minH="60vh" justifyContent="center" alignItems="center" className="col-span-2">
                <Flex direction='column'>
                    <Text fontSize={25} fontWeight='bold' align='center'>It looks like you have no reservations!</Text>
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
                  Start navigating! 
                </Button>
                </Flex>
            </Flex>
              )}
          </Box>
          )
        ) : null}
      </Container>
    </MainLayout>
  );
}

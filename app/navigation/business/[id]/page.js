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
  Button,
  Container,
} from "@chakra-ui/react";
import ImageViewer from "@/app/components/ImageViewer";
import dynamic from 'next/dynamic';
const LocationSelectorMap = dynamic(() => import('@/app/components/LocationSelectorMap'), {
  ssr: false
});
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Reviews from "../../components/Reviews";

export default function Business({ params }) {
  //Gets Business Id from param
  const businessId = params.id;
  //Gets Router to be used
  const router = useRouter();
  //Gets toast to be used
  const toast = useToast();
  //This hook is used to stored the business obtained by the DB
  const [business, setBusiness] = useState({
    b_user_id: "",
    b_type_id: "",
    business_tax_id: "",
    name: "",
    short_description: "",
    full_description: "",
    address: "",
    district: "",
    canton: "",
    province: "",
    latitude: "",
    longitude: "",
    days_operation: "0000000",
    operates_from: "",
    operates_to: "",
    link: "",
    phone_number: "",
  });

  //Hook to save the paths of the saved images
  const [images, setImages] = useState([]);
  //Const to handle loading state
  const [loading, setLoading] = useState(true);
  console.log(business);

  //Fetch the Business Info from the DB
  useEffect(() => {
    const fetchBusinessById = async () => {
      try {
        const response = await fetch(
          `/api/business/getBusinessById?business_id=${businessId}`
        );
        const data = await response.json();
        setBusiness(data.data);
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
        console.error("Error fetching business:", error);
      }
    };

    if (businessId) {
      fetchBusinessById();
    }
  }, [businessId]);

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
              <Text className="text-center text-teal-700 mb-6" fontSize={30} fontWeight="bold">
                {business ? business.name : null}
              </Text>
              <Text className="text-center text-teal-700" fontSize={15}>
                {business ? business.short_description : null}
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
                <Text mb={3}>{business ? business.full_description : null}</Text>
              </Box>
            )}
          </Box>
          <Box>
            <Skeleton isLoaded={!loading} mb={3}>
              <LocationSelectorMap
                initialLat={business ? business.latitude : null}
                initialLng={business ? business.longitude : null}
                className="my-3"
              />
            </Skeleton>
            <Skeleton isLoaded={!loading} mb={3}>
              <Divider mb={3} />

              {business ? (
                <List spacing={3}>
                <ListItem>
                  <ListIcon as={FaLocationDot} color="teal.500" />
                  {business.address}, {business.district}, {business.canton},{" "}
                  {business.province}, Costa Rica
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCalendarCheck} color="teal.500" />
                  Operates {describeDays(business.days_operation)}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdAccessTimeFilled} color="teal.500" />
                  Open from {business.operates_from} to {business.operates_to}
                </ListItem>
                {business.phone_number ? (
                  <ListItem>
                    <ListIcon as={FaPhone} color="teal.500" />
                    {business.phone_number}
                  </ListItem>
                ) : null}
              </List>
              ):null}
            </Skeleton>
            <Skeleton isLoaded={!loading} mb={3}>
              <Box w="full" mt={5}>
                <a
                  href={business ? `https://${business.link}`:null}
                  target="_blank"
                >
                    <Button rounded="full" colorScheme="teal" w="full" py={7} fontSize="lg">
                    Visit us now!
                    </Button>
                </a>
              </Box>
            </Skeleton>
          </Box>
        </Box>

        <Box className="col-span-3">
          {loading ? (
            <></>
          ) : (
            <Reviews
              reviews={business.Review}
              id={businessId}
              type="business"
            />
          )}
        </Box>
      </Container>
    </MainLayout>
  );
}

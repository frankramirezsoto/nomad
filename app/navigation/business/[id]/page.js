"use client";

import MainLayout from "@/app/layouts/main/MainLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast, Box, Skeleton, Text } from "@chakra-ui/react";
import ImageViewer from "@/app/components/ImageViewer";
import LocationSelectorMap from "@/app/components/LocationSelectorMap";

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
  console.log(images);
  //Const to handle loading state
  const [loading, setLoading] = useState(true);

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
    const dayNames = ["S","M", "K", "W", "T", "F", "S"];
    let ranges = [];
    let startIndex = null;
    let endIndex = null;

    // Check for all days operation scenario
    if (days === '1111111') {
        return "Daily";
    }

    // Parse the binary string to find ranges and standalone days
    for (let i = 0; i < days.length; i++) {
        if (days[i] === '1') {
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
                    ranges.push(dayNames[startIndex] + '-' + dayNames[endIndex]); // Multiple day range
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
            ranges.push(dayNames[startIndex] + '-' + dayNames[endIndex]);
        }
    }

    // Special cases for weekend only operation
    if (ranges.join(', ') === 'S-S') {
        return "Weekends";
    }

    return ranges.join(', ');
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
            className="h-[50vh] backdrop-contrast-50"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box className="p-5 bg-white rounded-lg" maxWidth="75%">
              <Text className="text-center text-teal-700 mb-6" fontSize={30}>
                {business.name}
              </Text>
              <Text className="text-center text-teal-700" fontSize={15}>
                {business.short_description}
              </Text>
            </Box>
          </Box>
        </Box>
      </Skeleton>

      <Box className="container mx-auto p-5" fontSize={20}>
        <Box className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Renders ImageViewer */}
          <Box className="col-span-2">
            <Skeleton isLoaded={!loading} mb={3}>
              <Box className="min-h-52">
                {!loading ? <ImageViewer imageUrls={images} /> : null}
              </Box>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
            <Box py={30}>
                <Text mb={3}>{business.full_description}</Text>   
                <Text mb={3}>
                    <span className="text-bold">Days Of Operation:</span>
                    <span>{describeDays(business.days_operation)}</span>
                </Text>
                <Text mb={3}>
                    <span className="text-bold">Hours Of Operation:</span>
                    <span>From: {business.operates_from} - To: {business.operates_to}</span>
                </Text>
            </Box>
            </Skeleton>
          </Box>
          <Box>
            <Skeleton isLoaded={!loading}>
              <LocationSelectorMap
                initialLat={business.latitude}
                initialLng={business.longitude}
              />
            </Skeleton>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}

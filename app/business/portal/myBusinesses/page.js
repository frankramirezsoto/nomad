"use client";

import { Box, Stack, Center, Text, Skeleton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";

export default function MyBusinesses() {
  const router = useRouter();
  const { businessUser } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (businessUser) {
      const fetchBusinessesByUserId = async (userId) => {
        try {
          const response = await fetch(
            `/api/business/getBusinessByUserId?b_user_id=${userId}`
          );
          const businessesResponse = await response.json();
          setBusinesses(businessesResponse.data);
          console.log(businessesResponse.data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
        setLoading(false);
      }
      };
      const userId = businessUser.b_user_id;
      fetchBusinessesByUserId(userId);
    } else {
      router.push("/business/login");
    }
  }, [businessUser]);

  return (
    <BusinessLayout>
      <Box className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Box
          as="Button"
          onClick={() => router.push("/business/portal/myBusinesses/add")}
          className="bg-teal-700 text-white hover:bg-teal-500"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          minHeight="10rem"
          minW="15rem"
          sx={{ transition: "transform 0.3s ease-in-out" }}
          _hover={{ transform: "scale(1.1)" }}
        >
          <Center>
            <FaPlus size={30} />
          </Center>
        </Box>
        {loading ? (
        // Render spinner while loading
        <Skeleton minHeight="10rem" minborderWidth="1px" borderRadius="lg"/>
        ) : (
        // Render businesses once loaded
        businesses &&
          businesses.map((business) => {
            const firstImageBase64 =
            //Image from db is coming up with some data incorrectly formated on base64, that's why we are replacing some of the substrings
              business.Images && business.Images[0]
                ? `${Buffer.from(business.Images[0].image.data)
                    .toString("base64")
                    .replace("data", "data:")
                    .replace("base64", ";base64,")
                    .replace(/=/g, "")}`
                : null;

            return (
              <Box
                key={business.business_id}
                as="Button"
                onClick={() => router.push(`/business/portal/myBusinesses/edit/${business.business_id}`)}
                borderWidth="1px"
                borderRadius="lg"
                minHeight="10rem"
                minW="15rem"
                overflow="hidden"
                sx={{ transition: "transform 0.3s ease-in-out" }}
                _hover={{ transform: "scale(1.1)" }}
                style={{
                  backgroundImage: `url(${firstImageBase64})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box className="backdrop-brightness-50 hover:backdrop-brightness-75" h="10rem" display="flex" alignItems="center" justifyContent="center">
                  <Box className="backdrop-blur bg-white/75 w-full text-center py-3">
                    <Text className="text-black font-bold">{business.name}</Text>
                  </Box>
                </Box>
              </Box>
            );
          })
      )}
      </Box>
    </BusinessLayout>
  );
}

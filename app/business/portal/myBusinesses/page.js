"use client";

import { Card, Box, HStack, Center } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useRouter } from 'next/navigation'

export default function MyBusinesses() {
    const router = useRouter()
  return (
    <BusinessLayout>
      <HStack>
        <Box p={7}>
          <Box
            as="Button"
            onClick={() => router.push('/business/portal/myBusinesses/add')}
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
              <FaPlus size={30}/>
            </Center>
          </Box>
        </Box>
      </HStack>
    </BusinessLayout>
  );
}

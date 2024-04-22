'use client'

import HomeLayout from "./layouts/main/HomeLayout";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState();
  return (
    <HomeLayout>
      <section>
        <Flex justifyContent="center">
          <Box w="full" py={10}>
            <Text
              align="center"
              fontWeight="bold"
              color="teal"
              fontSize={30}
              mb={5}
            >
              Search for your next adventure!
            </Text>
            <Box className="relative w-full max-w-xl mx-auto bg-white rounded-full">
              <input
                placeholder="e.g. Tour, Hike, Restaurant, etc."
                className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => router.push(`/navigation?s=${searchQuery}`)}
                type="submit"
                className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <FaSearch size={20} color="white" className="me-3" />
                Search
              </button>
            </Box>
          </Box>
        </Flex>
      </section>
    </HomeLayout>
  );
}

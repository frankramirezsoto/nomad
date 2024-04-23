"use client";

import ItineraryCart from "./ItineraryCart.jsx";
import AccessBtn from "./AccessBtn.jsx";
import { useAuth } from "@/app/context/AuthContext.js";
import UserOptionsMenu from "./UserOptionsMenu.jsx";
import { Text, Container, Button } from "@chakra-ui/react";
import Logo from "@/app/components/Logo";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CarouselHome from "./CarouselHome/CarouselHome.jsx";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <header className="bg-home text-white h-screen overflow-hidden">
      <div className="backdrop-brightness-50 py-5 lg:py-7 ">
        <Container
          maxW="95vw"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo />

          <div className="inline-flex items-center">
            <div className="me-10">
              {!user ? (
                <div>
                  <AccessBtn>Login</AccessBtn>
                  <AccessBtn>Register</AccessBtn>
                </div>
              ) : (
                <div className="text-black">
                  <UserOptionsMenu></UserOptionsMenu>
                </div>
              )}
            </div>
            <ItineraryCart />
          </div>
        </Container>
        <Container
          maxW="95vw"
          className="grid grid-cols-1 lg:grid-cols-2 h-[90vh]"
        >
          <div className="flex justify-center lg:justify-start items-center">
            <div className="mx-4">
              <Text
                fontSize={50}
                fontWeight="bolder"
                className="text-center lg:text-start mb-3 animate delay-one fadeInDown"
              >
                Welcome to <span className="text-teal-400">NOMADA!</span>
              </Text>
              <Text className="text-center lg:text-start animate delay-one-h fadeInLeft">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, cupiditate. Neque cumque repellat, quos sit iusto
                adipisci itaque nostrum nisi vero facere ipsa consequuntur
                rerum!{" "}
              </Text>
              <Button
                onClick={() => router.push("/navigation")}
                colorScheme="teal"
                mt={5}
                rounded="full"
                shadow="dark-lg"
                px={12}
                py={8}
                fontSize="lg"
                className="animate delay-one-h fadeInLeft"
              >
                {" "}
                Find your next adventure! <FaArrowRight className="ms-5" />
              </Button>
            </div>
          </div>
          <div>

              <CarouselHome />

          </div>
        </Container>
      </div>
    </header>
  );
}

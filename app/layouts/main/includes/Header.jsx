"use client";

import ItineraryCart from "./ItineraryCart.jsx";
import AccessBtn from "./AccessBtn.jsx";
import { useAuth } from "@/app/context/AuthContext.js";
import UserOptionsMenu from "./UserOptionsMenu.jsx";
import Logo from "@/app/components/Logo";
import { Container } from "@chakra-ui/react";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-home text-white">
      <div className="backdrop-brightness-50 py-5 lg:py-7 ">
        <Container
          maxW='95vw'
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
      </div>
      <div className="h-4 bg-teal-700"></div>
    </header>
  );
}

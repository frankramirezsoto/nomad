"use client";

import ItineraryCart from "./ItineraryCart.jsx";
import AccessBtn from "./AccessBtn.jsx";
import { useAuth } from "@/app/context/AuthContext.js";
import UserOptionsMenu from "./UserOptionsMenu.jsx";
import { Text } from "@chakra-ui/react";
import Logo from "@/app/components/Logo";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-home text-white h-screen">
      <div className="backdrop-brightness-50 py-5 lg:py-7 h-screen">
        <div className="container mx-3 md:mx-auto">
          <div className="flex justify-between items-center">
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 h-[75vh]">
            <div className="flex justify-center lg:justify-start items-center">
              <div>
              <Text fontSize={50} fontWeight="bolder" className="text-center lg:text-start mx-4 mb-3 animate delay-one fadeInDown">
                Welcome to <span className="text-teal-400">NOMADA!</span>
              </Text>
              <Text className="text-center lg:text-start mx-4 animate delay-one-h fadeInLeft">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, cupiditate. Neque cumque repellat, quos sit iusto
                adipisci itaque nostrum nisi vero facere ipsa consequuntur
                rerum! </Text>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

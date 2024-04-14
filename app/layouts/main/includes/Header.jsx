'use client'

import ItineraryCart from "./ItineraryCart.jsx";
import AccessBtn from "./AccessBtn.jsx";
import { useAuth } from "@/app/context/AuthContext.js";
import UserOptionsMenu from "./UserOptionsMenu.jsx";
import Logo from "@/app/components/Logo";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="header-bg-forest text-white">
      <div className="backdrop-brightness-50 py-5 lg:py-7 ">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />

          <div className="inline-flex items-center">
            <div className="me-10">
              {!user ?
                <div>
                  <AccessBtn>Login</AccessBtn>
                  <AccessBtn>Register</AccessBtn>
                </div>
              :
                <div className="text-black">
                  <UserOptionsMenu></UserOptionsMenu>
                </div>
              }  
            </div>
            <ItineraryCart />
          </div>
        </div>
      </div>
    </header>
  );
}

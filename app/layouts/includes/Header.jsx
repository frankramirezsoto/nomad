'use client'

import ItineraryCart from "./ItineraryCart.jsx";
import AccessBtn from "./AccessBtn.jsx";

export default function Header() {
  return (
    <header className="header-bg-forest text-white">
      <div className="backdrop-brightness-50 py-5 lg:py-7 ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="">
            <h1>LOGO</h1>
          </div>

          <div className="inline-flex items-center">
            <div className="me-10">
              <AccessBtn>Sign In</AccessBtn>
              <AccessBtn>Register</AccessBtn>
            </div>
            <ItineraryCart />
          </div>
        </div>
      </div>
    </header>
  );
}

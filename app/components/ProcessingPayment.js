"use client"

import Lottie from "lottie-react";
import paymentAnimation from "@/public/assets/images/payment-animation.json";
import { Text } from "@chakra-ui/react";

export default function ProcessingPayment() {
  return (
    <>
        <div 
            className="
                fixed 
                bg-black 
                bg-opacity-70 
                inset-0 
                w-full 
                z-40 
                flex 
                items-center 
                justify-center 
                h-[100vh]
                overflow-hidden
            "
        >
            <div className="p-3 rounded-md">
            <Lottie animationData={paymentAnimation} className="h-[350px]" />
            <Text align="center" fontSize={30} color="white" fontWeight="bold">Processing your reservation...</Text>
            </div>
        </div>
    </>
  );
};
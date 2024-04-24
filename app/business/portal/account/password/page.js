"use client";

import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Loading from "@/app/components/Loading";
import FormPassword from "../../components/FormPassword";

export default function EditPassword() {
  //Gets Business User from Context
  const { businessUser } = useAuth();
  //Gets Router to be used
  const router = useRouter();
  //Gets toast to be used
  const toast = useToast();

  //This hook is used to stored the Form data as it's being filled out
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  if (businessUser) {
    formData.b_user_id = businessUser.b_user_id;
  } else router.push("/business/login");

  console.log(formData);
  //Fetch the Account Info from the DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Handles success

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast({
        title:
          "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one number.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    console.log(formData);
    try {
      const response = await fetch("/api/account/updateaccount", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          b_user_id: businessUser.b_user_id,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Password change successful",
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
        // Update images
      } else {
        toast({
          title: "Failed to update password.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  // Function to handle business deletion
  return (
    <>
      <BusinessLayout onload="fetchAccountById()">
        <Box className="grid grid-cols-1 lg:grid-cols-2">
        <FormPassword
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        ></FormPassword>
        </Box>
      </BusinessLayout>
    </>
  );
}

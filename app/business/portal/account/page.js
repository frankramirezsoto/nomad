"use client";

import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  useToast,
  Modal,
  Box,
} from "@chakra-ui/react";
import Loading from "@/app/components/Loading";
import FormAccount from "../components/FormAccount";

export default function EditBusiness({ params }) {
  //Gets Business Id from param
  const b_user_id = params.id;
  //Gets Business User from Context
  const { businessUser } = useAuth();
  //Gets Router to be used
  const router = useRouter();
  //Gets toast to be used
  const toast = useToast();
  //Const to handle loading state
  const [loading, setLoading] = useState(true);

  //This hook is used to stored the Form data as it's being filled out
  const [formData, setFormData] = useState({
    b_user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  console.log(formData);

  if (businessUser) {
  } else router.push("/business/login");

  //Fetch the Account Info from the DB
  useEffect(() => {
    const fetchAccountById = async () => {
      try {
        console.log("entra");
        const response = await fetch(
          `/api/account/getAccountByUserId?b_user_id=${businessUser.b_user_id}`
        );
        const data = await response.json();
        console.log(response);
        setFormData(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };
    if (businessUser) {
      fetchAccountById();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Handles success

    try {
      const response = await fetch("/api/account/updateaccount", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Update succesful",
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
        // Update images
      } else {
        toast({
          title: "Failed to update account.",
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
      <BusinessLayout>
        <Box className="grid grid-cols-1 lg:grid-cols-2 mb-5">
        <Box>
        <FormAccount
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        ></FormAccount>
        <button
          onClick={()=>router.push("/business/portal/account/password")}  
          type="submit"
          className="bg-teal-500 text-white font-bold py-3 px-4 w-[94%] rounded-full hover:bg-teal-600 ms-7"
        >
          CHANGE PASSWORD
        </button>
        </Box>
        </Box>
      </BusinessLayout>
    </>
  );
}

"use client";

import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Loading from "@/app/components/Loading";
import FormBusiness from "../components/FormBusiness";

export default function AddBusiness() {
  //Gets Business User from Context
  const { businessUser } = useAuth();
  //Gets Router to be used
  const router = useRouter();
  //Gets toast to be used
  const toast = useToast();
  //Const to handle loading state
  const [loading, setLoading] = useState(false);

  //This hook is used to stored the Form data as it's being filled out
  const [formData, setFormData] = useState({
    b_user_id: "",
    b_type_id: "",
    business_tax_id: "",
    name: "",
    short_description: "",
    full_description: "",
    address: "",
    district: "",
    canton: "",
    province: "",
    latitude: "",
    longitude: "",
    days_operation: "0000000",
    operates_from: "",
    operates_to: "",
    link: "",
    phone_number: "",
  });

  if (businessUser) {
    formData.b_user_id = businessUser.b_user_id;
  } else router.push("/business/login");

  //Hook to save the paths of the saved images
  const [images, setImages] = useState([]);

  //Function to handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    try {
      const response = await fetch("/api/business/addBusiness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const addedBusiness = await response.json();
        // Now upload images for this business
        for (const image of images) {
          const imageResponse = await fetch("/api/business/addImages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              business_id: addedBusiness.data.business_id,
              image, 
            }),
          });

          if (!imageResponse.ok) {
            // Handle the case where an image fails to upload
            throw new Error("Failed to upload images");
          }
        }
        //Handles success
        setLoading(false);
        router.push("/business/portal/myBusinesses");
        toast({
          title: "Welcome to NOMADA!",
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      } else {
        setLoading(false);
        toast({
          title: "Failed to add business.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Failed to add business.",
        duration: 9000,
        isClosable: true,
        status: "error",
        position: "top-right",
      });
    }
  };

  return (
    <BusinessLayout>
      {loading ? (
        // Render spinner while loading
        <Loading />
      ) : <></> }
      <FormBusiness 
        formData={formData}
        setFormData={setFormData}
        images={images}
        setImages={setImages}
        handleSubmit={handleSubmit}
        isEditing={false}></FormBusiness>
      
    </BusinessLayout>
  );
}

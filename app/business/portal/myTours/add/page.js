"use client";

import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Loading from "@/app/components/Loading";
import FormTour from "../../components/FormTour";

export default function AddTour() {
  //Gets Tour User from Context
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
    name: "",
    short_description: "",
    full_description: "",
    address: "",
    district: "",
    canton: "",
    province: "",
    latitude: "",
    longitude: "",
    price_person:"",
    discount:"",
    discount_start:"",
    discount_end:"",
    days_operation: "0000000",
    operates_from: "",
    operates_to: "",
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
      const response = await fetch("/api/tours/addTour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const addedTour = await response.json();
        console.log(addedTour);
        // Now upload images for this tour
        for (const image of images) {
          const imageResponse = await fetch("/api/business/addImages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tour_id: addedTour.data.tour_id,
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
        router.push("/business/portal/myTours");
        toast({
          title: "Your tour was added with success!",
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      } else {
        setLoading(false);
        toast({
          title: "Failed to add tour.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Failed to add tour.",
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
      <FormTour 
        formData={formData}
        setFormData={setFormData}
        images={images}
        setImages={setImages}
        handleSubmit={handleSubmit}
        isEditing={false}></FormTour>
      
    </BusinessLayout>
  );
}

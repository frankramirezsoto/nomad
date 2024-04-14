"use client";

import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useDisclosure, Box, Container, useToast, Modal, Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Text, Center } from "@chakra-ui/react";
import Loading from "@/app/components/Loading";
import FormTour from "../../../components/FormTour";

export default function EditTour({ params }) {
  //Gets Tour Id from param 
  const tourId = params.id;
  //Gets Tour User from Context
  const { businessUser } = useAuth();
  //Gets Router to be used
  const router = useRouter();
  //Gets toast to be used
  const toast = useToast();
  //Const to handle loading state
  const [loading, setLoading] = useState(true);
  //Modal States
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  //Fetch the Tour Info from the DB
  useEffect(() => {
    const fetchTourById = async () => {
      try {
        const response = await fetch(`/api/tours/getTourById?tour_id=${tourId}`);
        const data = await response.json();
        setFormData(data.data);
        setLoading(false);
        var imageUrls = data.data.Images.map((image) => {
          return(
            `${Buffer.from(image.image.data)
              .toString("base64")
              .replace("data", "data:")
              .replace("base64", ";base64,")
              .replace(/=/g, "")}`
          )
        })
        setImages(imageUrls)
      } catch (error) {
        console.error('Error fetching tour:', error);
      }
    };

    if (tourId) {
      fetchTourById();
    }
  }, [tourId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Handles success
    setLoading(true);
    try {
      const response = await fetch('/api/tours/updateTour', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        // Update images
      const imageResponse = await fetch('/api/business/updateImages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tour_id: formData.tour_id, images }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        // Handle success
        setLoading(false);
        router.push("/business/portal/myTours");
        toast({
          title: `Successfully updated ${formData.name}`,
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      } else {
        setLoading(false);
        toast({
          title: "Failed to update tour.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
      } else {
        setLoading(false);
        toast({
          title: "Failed to update tour.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating tour:', error);
    }
  };

  // Function to handle tour deletion
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tours/deleteTour", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tour_id: params.id }), // Pass the tour_id to be deleted
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push("/business/portal/myTours");
        // Handle success - e.g., show a success toast
        setLoading(false);
        toast({
          title: data.message,
          duration: 5000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      } else {
        // Handle error - e.g., show an error toast
        const errorData = await response.json();
        setLoading(false);
        toast({
          title: errorData.error,
          duration: 5000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      // Handle error - e.g., show an error toast
      setLoading(false);
      toast({
        title: "Failed to delete tour",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "top-right",
      });
    }
  };
  return (
    <>
    {/* Modal to confirm deletion */}
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want yo delete your tour?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='orange' onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    <BusinessLayout>
      {loading ? (
        // Render spinner while loading
        <Loading />
      ) : 
      <Box h="10rem"
      style={{
        backgroundImage: `url(${images[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <Box className="text-white backdrop-brightness-50" h="10rem" display="flex" alignItems="center">
        <Box className="backdrop-blur bg-white/75 w-full text-center py-3">
                    <Text className="text-neutral-600 font-bold text-2xl">{formData.name}</Text>
         </Box>
        </Box>
      </Box> }
      <FormTour 
        formData={formData}
        setFormData={setFormData}
        images={images}
        setImages={setImages}
        handleSubmit={handleSubmit}
        isEditing={true}></FormTour>

          <Container maxW="97%" mb={6}>
            <button
              onClick={onOpen}
              className="bg-orange-700 text-white font-bold py-3 px-4 w-full rounded-full hover:bg-orange-600"
            >
              DELETE TOUR
            </button>
          </Container>
    </BusinessLayout>
    </>

  );
}

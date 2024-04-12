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
import FormBusiness from "../../components/FormBusiness";

export default function EditBusiness({ params }) {
  //Gets Business Id from param 
  const businessId = params.id;
  //Gets Business User from Context
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
  console.log(formData)

  if (businessUser) {
    formData.b_user_id = businessUser.b_user_id;
  } else router.push("/business/login");

  //Hook to save the paths of the saved images
  const [images, setImages] = useState([]);

  //Fetch the Business Info from the DB
  useEffect(() => {

    const fetchBusinessById = async () => {
      try {
        const response = await fetch(`/api/business/getBusinessById?business_id=${businessId}`);
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
        console.error('Error fetching business:', error);
      }
    };

    if (businessId) {
      fetchBusinessById();
    }
  }, [businessId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Handles success
    setLoading(true);
    try {
      const response = await fetch('/api/business/updateBusiness', {
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
        body: JSON.stringify({ business_id: formData.business_id, images }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        // Handle success
        setLoading(false);
        router.push("/business/portal/myBusinesses");
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
          title: "Failed to update business.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
      } else {
        setLoading(false);
        toast({
          title: "Failed to update business.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating business:', error);
    }
  };

  // Function to handle business deletion
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/business/deleteBusiness", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ business_id: params.id }), // Pass the business_id to be deleted
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push("/business/portal/myBusinesses");
        // Handle success - e.g., show a success toast
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
        toast({
          title: errorData.error,
          duration: 5000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting business:", error);
      // Handle error - e.g., show an error toast
      toast({
        title: "Failed to delete business",
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
            <Text>Are you sure you want yo delete your business?</Text>
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
      <FormBusiness 
        formData={formData}
        setFormData={setFormData}
        images={images}
        setImages={setImages}
        handleSubmit={handleSubmit}
        isEditing={true}></FormBusiness>

          <Container maxW="97%" mb={6}>
            <button
              onClick={onOpen}
              className="bg-orange-700 text-white font-bold py-3 px-4 w-full rounded-full hover:bg-orange-600"
            >
              DELETE BUSINESS
            </button>
          </Container>
    </BusinessLayout>
    </>

  );
}

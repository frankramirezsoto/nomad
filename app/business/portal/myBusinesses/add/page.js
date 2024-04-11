"use client";

import {
  Card,
  Box,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Container,
  Stack,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import LocationSelectorMap from "@/app/components/LocationSelectorMap";
import ImageUploadAndReorder from "../components/ImageUploadAndReorder";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

export default function AddBusiness() {
  //Gets Business User from Context
  const { businessUser } = useAuth();
  //Gets Router to be used
  const router = useRouter();
  //Gets toast to be used
  const toast = useToast();

  //This hook is used to keep the state of the Days of Operation
  const [checkboxDaysOpState, setCheckboxDaysOpState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
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
  console.log(images);
  //Function to fetch the Business Types from the database
  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      const response = await fetch("/api/business/getBusinessTypes");
      const data = await response.json();
      setBusinessTypes(data.data);
    };

    fetchBusinessTypes();
  }, []);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      b_type_id: parseInt(newType),
    }));
  };

  //Handler for the states of the Form Data variables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handler for checkbox state change
  const handleCheckboxDaysOpChange = (index) => {
    const newCheckboxState = [...checkboxDaysOpState];
    newCheckboxState[index] = !newCheckboxState[index];
    setCheckboxDaysOpState(newCheckboxState);

    // Update days_operation based on the new checkbox state
    const daysOperation = newCheckboxState
      .map((state) => (state ? "1" : "0"))
      .join("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      days_operation: daysOperation,
    }));
  };
  // Handle location select same as before
  const handleLocationSelect = (lat, lng) => {
    setFormData({
      ...formData,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  // The days' labels for reference
  const daysLabels = ["S", "M", "T", "W", "T", "F", "S"];

  //Function to handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

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
              image, // Assuming images are stored as Base64 strings in the images array
            }),
          });

          if (!imageResponse.ok) {
            // Handle the case where an image fails to upload
            throw new Error("Failed to upload images");
          }
        }
        router.push("/business/portal/myBusinesses");
        toast({
          title: "Welcome to NOMADA!",
          duration: 9000,
          isClosable: true,
          status: "success",
          position: "top-right",
        });
      } else {
        toast({
          title: "Failed to add business.",
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error) {
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
      <form onSubmit={handleSubmit}>
        <Box p={7}>
          <Card mb={6}>
            <CardBody>
              <Container maxW="95%">
                <h2 className="text-center font-bold mb-3">Business Info</h2>

                {/* Business Name  */}
                <FormControl isRequired mb={3}>
                  <FormLabel>Business Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Business TAX ID */}
                <FormControl isRequired mb={3}>
                  <FormLabel>Business Tax ID</FormLabel>
                  <Input
                    id="business_tax_id"
                    name="business_tax_id"
                    value={formData.business_tax_id}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Business Type Select*/}
                <FormControl isRequired mb={3}>
                  <FormLabel>Business Type</FormLabel>
                  <Select
                    placeholder="Select business type"
                    onChange={handleTypeChange}
                  >
                    {businessTypes &&
                      businessTypes.map((type) => (
                        <option key={type.b_type_id} value={type.b_type_id}>
                          {type.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                {/* Short Description */}
                <FormControl isRequired mb={3}>
                  <FormLabel>Short Description</FormLabel>
                  <Textarea
                    id="short_description"
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Full Description */}
                <FormControl isRequired mb={3}>
                  <FormLabel>Full Description</FormLabel>
                  <Textarea
                    id="full_description"
                    name="full_description"
                    value={formData.full_description}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Hours of Operation */}
                <FormLabel mb={3}>Hours of Operation</FormLabel>
                <Box className="grid grid-cols-1 md:grid-cols-2">
                  <FormControl
                    display="flex"
                    alignItems="center"
                    isRequired
                    mb={3}
                  >
                    <FormLabel>From:</FormLabel>
                    <Input
                      className="mb-3 md:mb-0 md:me-3"
                      type="time"
                      id="operates_from"
                      name="operates_from"
                      value={formData.operates_from}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    isRequired
                    mb={3}
                  >
                    <FormLabel>To:</FormLabel>
                    <Input
                      type="time"
                      id="operates_to"
                      name="operates_to"
                      value={formData.operates_to}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>

                {/* Days of Operation */}
                <FormControl display="flex" alignItems="center">
                  <FormLabel me={12}>Days of Operation</FormLabel>
                  <Stack spacing={5} direction="row">
                    {daysLabels.map((label, index) => (
                      <Box key={label}>
                        <FormLabel>{label}</FormLabel>
                        <Checkbox
                          colorScheme="teal"
                          isChecked={checkboxDaysOpState[index]}
                          onChange={() => handleCheckboxDaysOpChange(index)}
                        ></Checkbox>
                      </Box>
                    ))}
                  </Stack>
                </FormControl>

                {/* Full Address */}
                <FormControl isRequired mb={6}>
                  <FormLabel>Full Address</FormLabel>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* District  */}
                <FormControl isRequired mb={3}>
                  <FormLabel>District</FormLabel>
                  <Input
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </FormControl>

                <Box className="grid grid-cols-1 md:grid-cols-2 mb-3">
                  <FormControl
                    display="flex"
                    alignItems="center"
                    isRequired
                    mb={3}
                  >
                    <FormLabel>Canton:</FormLabel>
                    <Input
                      className="mb-3 md:mb-0 md:me-3"
                      id="canton"
                      name="canton"
                      value={formData.canton}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    isRequired
                    mb={3}
                  >
                    <FormLabel>Province:</FormLabel>
                    <Input
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>

                {/* Location Selection */}
                <FormLabel>Business Location</FormLabel>
                <LocationSelectorMap
                  onLocationSelect={handleLocationSelect}
                  initialLat={parseFloat(formData.latitude)}
                  initialLng={parseFloat(formData.longitude)}
                />
              </Container>
            </CardBody>
          </Card>
          {/* Card for image upload */}
          <Card mb={6}>
            <CardBody>
              <Container maxW="95%">
                <h2 className="text-center font-bold mb-3">Business Images</h2>
                <ImageUploadAndReorder images={images} setImages={setImages} />
              </Container>
            </CardBody>
          </Card>
          {/* Card for social media upload */}
          <Card mb={6}>
            <CardBody>
              <Container maxW="95%">
                <h2 className="text-center font-bold mb-6">
                  Contact information
                </h2>

                <Stack spacing={4}>
                  <InputGroup>
                    <InputLeftAddon>+506</InputLeftAddon>
                    <Input
                      type="number"
                      placeholder="Enter the phone number for people to contact you"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftAddon>https://</InputLeftAddon>
                    <Input
                      placeholder="www.my-website-or-social-media-link.com"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Stack>
              </Container>
            </CardBody>
          </Card>
          <button
            type="submit"
            className="bg-teal-700 text-white font-bold py-3 px-4 w-full rounded-full hover:bg-teal-600"
          >
            ADD MY BUSINESS TO NOMADA
          </button>
        </Box>
      </form>
    </BusinessLayout>
  );
}

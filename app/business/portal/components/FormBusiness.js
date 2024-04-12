"use client";

import React from "react";
import {
  Box,
  Card,
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
import LocationSelectorMap from "@/app/components/LocationSelectorMap";
import ImageUploadAndReorder from "./ImageUploadAndReorder";
import { useState, useEffect } from "react";

export default function FormBusiness({
  formData,
  setFormData,
  images,
  setImages,
  handleSubmit,
  isEditing,
}) {
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

  //Function to fetch the Business Types from the database
  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
    //Function to fetch Business Types
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
  // Hook to update checkboxes
  useEffect(() => {
    // Convert the days_operation string from formData into an array of booleans
    const daysOpArray = formData.days_operation
      .split("")
      .map((char) => char === "1");
    // Update the checkboxDaysOpState with this array
    setCheckboxDaysOpState(daysOpArray);
  }, [formData.days_operation]);

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

  return (
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
                  value={formData.b_type_id ? formData.b_type_id : null}
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
              <FormControl isRequired mb={3}>
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
          {isEditing ? "UPDATE BUSINESS" : "ADD MY BUSINESS TO NOMADA"}
        </button>
      </Box>
    </form>
  );
}

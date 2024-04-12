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
import { FaDollarSign } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export default function FormTour({
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
              <h2 className="text-center font-bold mb-3">Tour Info</h2>

              {/* Tour Name  */}
              <FormControl isRequired mb={3}>
                <FormLabel>Tour Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
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
              <FormControl isRequired mb={6}>
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

              {/* District  */}
              <FormControl isRequired mb={3}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </FormControl>
              
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
        {/* Card for Pricing */}
        <Card mb={6}>
          <CardBody>
            <Container maxW="95%">
              <h2 className="text-center font-bold mb-6">
                Pricing
              </h2>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InputGroup >
                  <InputLeftAddon><FaDollarSign /></InputLeftAddon>
                  <Input
                    type="number"
                    placeholder="Price"
                    id="price_person"
                    name="price_person"
                    value={formData.price_person}
                    onChange={handleChange}
                    isRequired
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon><FaPercentage /></InputLeftAddon>
                  <Input
                    type="number"
                    placeholder="Discount Percentage (optional)"
                    id="discount"
                    name="discount"
                    value={formData.discount || 0}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon><MdDateRange /></InputLeftAddon>
                  <Input
                    placeholder="Discount Start Date (optional)"
                    type="date"
                    id="discount_start"
                    name="discount_start"
                    value={formData.discount_start ? formData.discount_start.split('T')[0] : ''}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon><MdDateRange /></InputLeftAddon>
                  <Input
                    placeholder="Discount End Date (optional)"
                    type="date"
                    id="discount_end"
                    name="discount_end"
                    value={formData.discount_end ? formData.discount_end.split('T')[0] : ''}
                    onChange={handleChange}
                  />
                </InputGroup>
                
              </Box>
            </Container>
          </CardBody>
        </Card>

        <button
          type="submit"
          className="bg-teal-700 text-white font-bold py-3 px-4 w-full rounded-full hover:bg-teal-600"
        >
          {isEditing ? "UPDATE TOUR" : "ADD MY TOUR TO NOMADA"}
        </button>
      </Box>
    </form>
  );
}

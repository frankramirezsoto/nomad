"use client";

import React from "react";
import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Container,
} from "@chakra-ui/react";
import LocationSelectorMap from "@/app/components/LocationSelectorMap";
import ImageUploadAndReorder from "./ImageUploadAndReorder";
import { useState, useEffect } from "react";

export default function FormAccount({
  formData,
  setFormData,
  handleSubmit,
}) {
  // Hook to update checkboxes

  //Handler for the states of the Form Data variables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle location select same as before
  const handleLocationSelect = (lat, lng) => {
    setFormData({
      ...formData,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={7}>
        <Card mb={6}>
          <CardBody>
            <Container maxW="95%">
              <h2 className="text-center font-bold mb-3">Account Info</h2>

              {/* First Name  */}
              <FormControl isRequired mb={3}>
                <FormLabel>First Name</FormLabel>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Last Name  */}
              <FormControl isRequired mb={3}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Email  */}
              <FormControl isRequired mb={3}>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Phone  */}
              <FormControl mb={3}>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="(optional)"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>
            </Container>
          </CardBody>
        </Card>

        <button
          type="submit"
          className="bg-teal-700 text-white font-bold py-3 px-4 w-full rounded-full hover:bg-teal-600"
        >
          UPDATE ACCOUNT
        </button>
      </Box>
    </form>
  );
}

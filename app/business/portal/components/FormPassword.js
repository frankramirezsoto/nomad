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

export default function FormPassword({
  formData,
  setFormData,
  handleSubmit,
}) {
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
              <h2 className="text-center font-bold mb-3">Change password</h2>

              {/* Password  */}
              <FormControl isRequired mb={3}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
          UPDATE PASSWORD
        </button>
      </Box>
    </form>
  );
}

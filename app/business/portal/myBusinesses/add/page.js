"use client";

import {
  Card,
  Box,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Container,
} from "@chakra-ui/react";
import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useState } from "react";

export default function AddBusiness() {
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
    days_operation: "",
    operates_from: "",
    operates_to: "",
    call_to_action: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <BusinessLayout>
      <Box p={7}>
        <Card>
          <CardBody>
            <Container maxW="95%">
              <h2 className="text-center font-bold mb-3">Business Info</h2>
              <FormControl isRequired mb={3}>
                <FormLabel>Business Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Short Description</FormLabel>
                <Textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Full Description</FormLabel>
                <Textarea
                  name="full_description"
                  value={formData.full_description}
                  onChange={handleChange}
                />
              </FormControl>

              <FormLabel mb={3}>Hours of Operation</FormLabel>
              <Box className="grid grid-cols-1 md:grid-cols-2">
                  <FormControl  display="flex" alignItems="center" isRequired>
                    <FormLabel>From:</FormLabel>
                    <Input
                        me={3}
                      type="time"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center" isRequired>
                    <FormLabel>To:</FormLabel>
                    <Input
                      type="time"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              <Box className="grid grid-cols-1 md:grid-cols-2"></Box>
            </Container>
          </CardBody>
        </Card>
      </Box>
    </BusinessLayout>
  );
}

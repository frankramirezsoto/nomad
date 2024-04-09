"use client";

import {
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Button,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast({
        title:
          "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one number.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const response = await fetch("/api/registerbusiness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }),
      });

      if (response.ok) {
        // Handle successful registration
        router.push("/business/login");
      } else {
        const error = await response.json();
        toast({
          title: error.message || "An error occurred during registration",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(
        "There was a problem with the registration request:",
        error
      );
    }
  };

  return (
    <main className="min-h-screen business-access-bg">
      <div className="backdrop-brightness-50">
        <div className="min-h-screen flex justify-center items-center h-100">
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit} className="p-16">
                <p className="text-xl text-gray-600 text-center">
                  Welcome to Brand
                </p>
                <h2 className="text-2xl font-semibold text-gray-700 text-center">
                  Sign Up
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <div className="mt-4">
                  <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <div className="mt-4">
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <div className="mt-4">
                  <FormControl isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <div className="mt-8">
                  <Button
                    type="submit"
                    className="bg-teal-700 text-white font-bold py-3 px-4 w-full rounded-full hover:bg-teal-600"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}

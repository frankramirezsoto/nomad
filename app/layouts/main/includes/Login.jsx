'use client'

import { useState } from "react";
import {
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useAuth } from "@/app/context/AuthContext";
import { useToast } from '@chakra-ui/react'
import Loading from "@/app/components/Loading";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const toast = useToast();
  //Const to handle loading state
  const [loading, setLoading] = useState(false);

  //Function to handle login submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission
    setLoading(true);
    try {
      //Fetches data from api
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) { 
        //Converts response to Json and logs the userData using the AuthContext
        const userData = await response.json(); 
        setLoading(false);
        login(userData.data);
      } else {
        const error = await response.json(); 
        setLoading(false);
        toast({
          title: `${error.error}`,
          duration: 9000,
          isClosable: true,
          status:"error",
          position:"top-right"
        })
        // Handle errors, such as showing an error message
        console.error('Login failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('There was a problem with the login request:', error);
    }
  };

  return (
    <>
      {loading ? (
        // Render spinner while loading
        <Loading />
      ) : <></> }
      <form onSubmit={handleSubmit} className="p-16">
      <ModalCloseButton />
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Brand
      </h2>
      <p className="text-xl text-gray-600 text-center">Welcome back!</p>

      <div className="mt-4">
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
      </div>
      <div className="mt-4">
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="bg-teal-700 text-white font-bold py-3 px-4 w-full rounded-full hover:bg-teal-600"
        >
          Login
        </button>
      </div>
    </form>
    </>
  );
}

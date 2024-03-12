'use client'

import { useState } from "react";
import {
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) { 
        const userData = await response.json(); 
        // Handle successful login here (e.g., redirect, store user data)
        console.log('Login successful:', userData.data);
      } else {
        const res = await response.json(); 
        console.log(res)
        // Handle errors, such as showing an error message
        console.error('Login failed');
      }
    } catch (error) {
      console.error('There was a problem with the login request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-16">
      <div className="flex justify-end bg-teal-400">
        <ModalCloseButton />
      </div>
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
  );
}
export default Login;

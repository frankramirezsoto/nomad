'use client'

import {
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";

function Register() {
  return (
    <div className="p-16">
      <div className="flex justify-end bg-teal-400">
        <ModalCloseButton></ModalCloseButton>
      </div>
      <p className="text-xl text-gray-600 text-center">Welcome to</p>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Brand
      </h2>
      <div className="mt-4">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input />
        </FormControl>
      </div>
      <div className="mt-4">
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
      </div>
      <div className="mt-4">
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </div>
      <div className="mt-4">
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" />
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
    </div>
  );
}

export default Register;

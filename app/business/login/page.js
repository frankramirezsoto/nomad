"use client";

import {
  Card,
  CardBody,
  FormControl,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginBusiness, businessUser } = useAuth();
  const toast = useToast();
  const router = useRouter();
  //Const to handle loading state
  const [loading, setLoading] = useState(false);

  if (businessUser) {
    router.push("/business/portal/myBusinesses");
  }
  //Function to handle login submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission
    setLoading(true);
    try {
      //Fetches data from api
      const response = await fetch("/api/authbusiness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        //Converts response to Json and logs the userData using the AuthContext
        const userData = await response.json();
        setLoading(false);
        loginBusiness(userData.data);
      } else {
        const error = await response.json();
        setLoading(false);
        toast({
          title: `${error.error}`,
          duration: 9000,
          isClosable: true,
          status: "error",
          position: "top-right",
        });
        // Handle errors, such as showing an error message
        console.error("Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("There was a problem with the login request:", error);
    }
  };

  return (
    <>
    {loading ? (
        // Render spinner while loading
        <Loading />
      ) : <></> }
    <main className="min-h-screen bg-random">
      <div className="backdrop-brightness-50">
        <div className="min-h-screen flex justify-center items-center h-100">
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </div>
                <div className="mt-4">
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
    </>
  );
}

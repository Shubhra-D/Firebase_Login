import { auth, provider } from "../Firebase/firebaseConfig";
import { Box, Button, Field, Flex, Input, Span, Text } from "@chakra-ui/react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { SiGoogle } from "react-icons/si";
import {  useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //handle inputs
  const handleInputChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  //handle login email/password
 const handleLogin = async()=>{
  setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/profile"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
 }

   // Handle Google Sign-in
   const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <Flex align={"center"} justify={"center"} w="100%">
      <Box
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        maxW="500px"
        margin={16}
        p={12}
        borderRadius={"2xl"}
        border={"1px solid grey"}
        height={"100vh"}
        flexDirection={"column"}
        display={"flex"}
      >
        <Text fontSize={"3xl"} marginBottom={3} fontWeight={"medium"}>
          SignIn to your <Span>PopX account</Span>
        </Text>
        <Text marginBottom={4} color={"grey"}>
          Lorem Ipsum Signin Popx Acoount Fo Lorem Ipsum and All Class and Dot
        </Text>
        {error && <Text color={"red.300"}>{error}</Text>}
        <Field.Root>
          <Field.Label color={"purple.600"}>
            Email address
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label color={"purple.600"}>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Field.Root>

        <Button
          marginTop={4}
          w={"100%"}
          bg={"purple.800"}
          color={"whiteAlpha.800"}
          onClick={handleLogin}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          marginTop={4}
          w={"100%"}
          bg={"purple.800"}
          color={"whiteAlpha.800"}
          
          onClick={handleGoogleSignIn}
          isLoading={loading}
        >
         <SiGoogle/> Sign In With Google
        </Button>
      </Box>
    </Flex>
  );
};

export default Signin;

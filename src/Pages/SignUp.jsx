import { auth } from "../Firebase/firebaseConfig";
import {
  Box,
  Button,
  Field,
  Flex,
  HStack,
  Input,
  RadioGroup,
  Span,
  Text,
} from "@chakra-ui/react";
import { doc,setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
const [value,setValue] = useState('yes');
const items = [
  {label:"Yes",value:"yes"},
  {label:"No",value:"no"}
]

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: "yes",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //handleInputChange
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handleSignup
  const handleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        isAgency: formData.isAgency,
      });
      alert("SignUp Succesfull");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Flex align={"center"} justify={"center"} w="100%">
      <Box
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        maxW="500px"
        margin={16}
        p={6}
        borderRadius={"2xl"}
        border={"1px solid grey"}
        height={"100vh"}
        alignItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
        display={"flex"}
      >
        <Text fontSize={"3xl"} marginBottom={3} fontWeight={"medium"}>
          Create your <Span>PopX account</Span>
        </Text>
        <Field.Root required>
          <Field.Label color={"purple.600"}>
            Full Name
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label color={"purple.600"}>
            Phone Number
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Field.Root>
        <Field.Root required>
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
        <Field.Root required>
          <Field.Label color={"purple.600"}>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <Input type="password" />
        </Field.Root>
        <Field.Root required>
          <Field.Label color={"purple.600"}>
            Company Name
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </Field.Root>
        <Field.Root required marginTop={4}>
          <Field.Label>
            Are you an Agency?
            <Field.RequiredIndicator />
          </Field.Label>
          <RadioGroup.Root
            value={formData.isAgency}
            colorPalette={'purple'}
            variant={'outline'}
            onChange={(val) => setFormData({ ...formData, isAgency: val })}
          >
            <HStack>
              {items.map((item)=>(
                <RadioGroup.Item key={item.value} value={item.value} >
                  <RadioGroup.ItemHiddenInput/>
                  <RadioGroup.ItemIndicator/>
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
                
              ))}
            </HStack>
          </RadioGroup.Root>
        </Field.Root>
        <Button
          as={Link}
          onClick={handleSignUp}
          isLoading={loading}
          to="/signup"
          w={"100%"}
          bg={"purple.800"}
          color={"whiteAlpha.800"}
          marginTop={6}
        >
          Create Account
        </Button>
      </Box>
    </Flex>
  );
};

export default SignUp;

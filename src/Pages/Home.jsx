import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Flex justify={"center"} align={"center"} width={"100%"}>
      <Box
        border={"1px solid grey"}
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        maxW="500px"
        display={"flex"}
        borderRadius={'2xl'}
        m={"12"}
        gap={4}
        p={'12'}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text fontSize={"3xl"} fontWeight={"medium"}>
          Welcome to PopX
        </Text>
        <Text color={"gray.400"}>
          Create your acoount to get started with this thrilling journey of
          Frontend Development
        </Text>

        <Button
          as={Link}
          to="signup"
          color={"whiteAlpha.900"}
          width="100%"
          bg={"purple.600"}
        >
          Create Account
        </Button>

        <Button
          as={Link}
          to="signin"
          color={"purple.900"}
          bg={"purple.300"}
          w={"100%"}
        >
          Already Registered? Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Home;

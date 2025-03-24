import { auth } from "../Firebase/firebaseConfig";
import { Avatar, Box, Circle, Flex, Float, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Flex justify={"center"} align={"center"} width={"100%"}>
      <Box
        border={"1px solid grey"}
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        maxW="500px"
        display={"flex"}
        borderRadius={"2xl"}
        m={"12"}
        gap={4}
        bg={"gray.200"}
        p={"12"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Text
          bg={"whiteAlpha.600"}
          borderRadius={"2xl"}
          fontSize={"2xl"}
          textAlign={"start"}
          padding={3}
        >
          Account Settings
        </Text>
        <Flex alignItems={"start"} marginTop={"10"} gap={6}>
          <Avatar.Root size={"2xl"}>
            <Avatar.Fallback name="UserName" />
            <Avatar.Image src={user?.photoURL || "Firebase_Login/defaultpic.jpeg"} />
            <Float placement={"bottom-end"} offsetX={"1"} offsetY={"1"}>
              <Circle
                bg={"purple.300"}
                size={"8px"}
                outline={"0.2em solid"}
                outlineColor={"blue.300"}
              />
            </Float>
          </Avatar.Root>
          <Box>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {user?.displayName || "User"}
            </Text>
            <Text>{user?.email}</Text>
          </Box>
        </Flex>

        <Text fontSize="md" color={"gray.500"} marginTop={12}>
          Welcome to your profile! This is a sample hardcoded content section
          where you can write details about yourself. Feel free to personalize
          this section later.
        </Text>
      </Box>
    </Flex>
  );
};

export default Profile;

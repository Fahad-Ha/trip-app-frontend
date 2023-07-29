import { Pressable, Text } from "react-native";
import React, { useContext } from "react";
import {  removeToken } from "../apis/storage";
import UserContext from "../context/UserContext";

const Logout = () => {
  const { setUser } = useContext(UserContext);

  return (
    <Pressable
      onPress={() => {
        removeToken();
        setUser(false);
      }}
    >
      <Text className="text-2xl p-2 text-gray-100  my-auto  ">Logout</Text>
    </Pressable>
  );
};

export default Logout;

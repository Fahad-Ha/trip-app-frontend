import { Pressable, Text } from "react-native";
import React, { useContext } from "react";
import { removeToken } from "../apis/storage";
import UserContext from "../context/UserContext";
import { useTheme } from "@react-navigation/native";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const theme = useTheme(); // Get the currently active theme

  return (
    <Pressable
      onPress={() => {
        removeToken();
        setUser(false);
      }}
    >
      <Text
        style={{ color: theme.colors.text }}
        className="text-2xl p-2   my-auto  "
      >
        Logout
      </Text>
    </Pressable>
  );
};

export default Logout;

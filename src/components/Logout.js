import { Text, TouchableHighlight } from "react-native";
import React, { useContext, useEffect } from "react";
import { getToken, removeToken } from "../apis/storage";
import UserContext from "../context/UserContext";

const Logout = () => {
  const { setUser } = useContext(UserContext);

  return (
    <TouchableHighlight
      onPress={() => {
        removeToken();
        setUser(false);
      }}
    >
      <Text>Logout</Text>
    </TouchableHighlight>
  );
};

export default Logout;
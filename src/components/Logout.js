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
      <Text className="text-2xl p-2 text-gray-100  my-auto  ">Logout</Text>
    </TouchableHighlight>
  );
};

export default Logout;

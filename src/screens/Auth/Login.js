import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { login } from "../../apis/auth";
import { checkToken, saveToken } from "../../apis/storage";
import UserContext from "../../context/UserContext";

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useContext(UserContext);

  const {
    mutate: loginFunction,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      console.log("first");
      saveToken(data.token);
      setUser(checkToken());
    },
  });

  const handleLogin = () => {
    // Perform login logic here, such as calling an API
    loginFunction();
  };
  const handleRegister = () => {
    // Navigate to the Register screen
    navigation.navigate("RegisterUsername");
  };

  return (
    <View className="flex-1 items-center">
      <View className="w-4/5 mt-10 mb-4">
        <Text className="text-xl text-white text-center font-bold mb-4">
          Login
        </Text>
        <Text className="text-white opacity-75 text-center mb-2">
          Enter your username and password to login.
        </Text>
      </View>
      <TextInput
        className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded bg-[#1c1c1c] text-white "
        placeholder="Username"
        value={userInfo.username}
        onChangeText={(username) => setUserInfo({ ...userInfo, username })}
        placeholderTextColor="#ffffffec"
      />
      <TextInput
        className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded bg-[#1c1c1c] text-white "
        placeholder="Password"
        secureTextEntry
        value={userInfo.password}
        onChangeText={(password) => setUserInfo({ ...userInfo, password })}
        placeholderTextColor="#ffffffec"
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableHighlight
        className="mt-2"
        onPress={handleRegister}
        underlayColor="#00000010"
      >
        <Text className="text-blue-500 text-center">
          Don't have an account? Register
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default Login;

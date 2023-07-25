import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const RegisterPassword = ({ route, navigation }) => {
  const { username } = route.params;
  const [password, setPassword] = useState("");

  const handleNext = () => {
    navigation.navigate("RegisterImage", { username, password });
  };

  return (
    <View className="flex-1 items-center ">
    <View className=" mt-[10] mb-4 w-4/5">
      <Text className=" text-xl text-white text-center font-bold mb-4">
       
        Pick a password
      </Text>
      <Text className=" text-[#ffffffec]  text-center mb-2">
        We cannot remember the password, so you need to enter it on every device you have even if it is on iCloud :)
      </Text>
    </View>
      <TextInput
        className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded bg-[#1c1c1c] text-white "
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#ffffffec"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default RegisterPassword;

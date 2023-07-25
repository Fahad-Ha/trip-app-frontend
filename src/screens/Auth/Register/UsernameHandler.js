import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const RegisterUsername = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleNext = () => {
    navigation.navigate("RegisterPassword", { username });
  };

  return (
    <View className="flex-1 items-center ">
      <View className=" mt-[10] mb-4 w-4/5">
        <Text className=" text-xl text-white text-center font-bold mb-4">
         
          Pick username
        </Text>
        <Text className=" text-[#ffffffec]  text-center mb-2">
          Choose a username for your new account. You can always change it
          later.
        </Text>
      </View>
      <TextInput
        className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded bg-[#1c1c1c] text-white "
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#ffffffec"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default RegisterUsername;

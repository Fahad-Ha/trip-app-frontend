import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { addTrip } from "../apis/trips";
import React, { useState } from "react";

export default function AddTrip() {
  const [userInfo, setUserInfo] = useState({});

  const { mutate: addTripFunction, error } = useMutation({
    mutationFn: () => addTrip({ ...userInfo, image }),
    onSuccess: () => {
      console.log("success");
    },
  });

  return (
    <View className="flex-1 items-center">
      <View className=" w-[70%]  mt-8">
        <Text className="mb-1 text-white">Title</Text>
        <TextInput
          className="bg-gray-100 rounded-xl mb-6 p-2"
          placeholder="Title"
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, title: value });
          }}
        ></TextInput>
        <Text className="mb-1 text-white">Description</Text>
        <TextInput
          className="bg-gray-100 rounded-xl p-2 mb-4"
          multiline={true}
          returnKeyType="done"
          placeholder="Description"
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, description: value });
          }}
        ></TextInput>
        <Text className="mt-4 mb-1 text-white">Image</Text>
        <TouchableOpacity className="bg-gray-100 rounded-xl items-center p-8">
          <Ionicons name="add" size={52} color="green" />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => addTripFunction()}
            className="bg-indigo-600 rounded-xl items-center p-5 mt-6"
          >
            <Text className="text-white text-xl font-semibold">
              Add the trip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

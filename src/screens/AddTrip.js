import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { addTrip } from "../apis/trips";
import React, { useState } from "react";
import TripImageHandler from "../components/TripImageHandler";

export default function AddTrip() {
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState(null);
  const { mutate: addTripFunction, error } = useMutation({
    mutationFn: () => addTrip({ ...userInfo, image }),
    onSuccess: () => {
      console.log("success");
    },
  });

  return (
    <ScrollView contentContainerStyle={{}}>
      <View className="mb-40 items-center">
        <View className=" w-[70%]  mt-8 min-h-[100%]">
          <View>
            <Text className="mb-1 text-white">Title</Text>
            <TextInput
              className="bg-gray-100 rounded-xl mb-6 p-2"
              placeholder="Title"
              onChangeText={(value) => {
                setUserInfo({ ...userInfo, title: value });
              }}
            ></TextInput>
          </View>
          <View>
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
          </View>
          <Text className="mt-4 mb-1 text-white">Image</Text>
          <View>
            <TripImageHandler image={image} setImage={setImage} />
          </View>
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
    </ScrollView>
  );
}

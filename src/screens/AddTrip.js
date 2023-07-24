import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddTrip() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-xl font-bold absolute top-20">AddTrip</Text>
      <View className=" w-[70%] ">
        <Text className="mb-1">Title</Text>
        <TextInput
          className="bg-gray-100 rounded-xl mb-6 p-2"
          placeholder="Title"
        ></TextInput>
        <Text className="mb-1">Description</Text>
        <TextInput
          className="bg-gray-100 rounded-xl p-2 mb-6"
          placeholder="Description"
        ></TextInput>
        <Text className="mt-4 mb-1">Image</Text>
        <TouchableOpacity className="bg-gray-100 rounded-xl items-center p-8">
          <Ionicons name="add" size={52} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

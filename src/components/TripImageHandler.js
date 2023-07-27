import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TripImageHandler({ image, setImage }) {
  useEffect(() => {
    requestImagePickerPermission();
  }, []);

  const requestImagePickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleImage = () => {
    if (image == null) return null;
    return true;
  };
  const resetImage = () => {
    setImage(null);
  };
  return (
    <TouchableOpacity
      onPress={pickImage}
      className="rounded bg-[#1c1c1c] items-center w-full min-h-30 max-h-80"
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      ) : (
        <Ionicons name="add" size={52} color="#ffffff40"/>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    top: -60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  marginRegister: {
    marginTop: 10,
  },
  registerButtonContainer: {
    color: "#4287f5",
  },
  removeButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    textAlign: "center",
    color: "#FFF",
  },
});

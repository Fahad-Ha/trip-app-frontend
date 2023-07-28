import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";

export default function ImageHandler({ image, setImage }) {
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Get the file extension
      let fileExtension = result.assets[0].uri.split(".").pop();

      // Check if the file extension is jpg, jpeg, or png
      if (["jpg", "jpeg", "png"].includes(fileExtension.toLowerCase())) {
        setImage(result.assets[0].uri);
      } else {
        alert("Only jpg, jpeg, or png images are allowed");
      }
    }
  };
  const handleImage = () => {
    if (
      image ==
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    )
      return null;
    return true;
  };
  const resetImage = () => {
    setImage(
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    );
  };
  return (
    <Pressable onPress={pickImage}>
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: "gray",
          borderRadius: 100,
          overflow: "hidden",
          position: "relative",
          top: -70,
        }}
      >
        {handleImage() ? (
          <>
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
            <TouchableHighlight
              onPress={resetImage}
              style={styles.removeButton}
              underlayColor="#00000010"
            >
              <Text
                style={{ color: "#FFF", textAlign: "center", fontSize: 20 }}
              >
                Remove
              </Text>
            </TouchableHighlight>
          </>
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
    </Pressable>
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

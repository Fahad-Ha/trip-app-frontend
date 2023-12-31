import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import ImageHandler from "../../../components/ImagePickerHandler";
import { register } from "../../../apis/auth";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../../../context/UserContext";
import { checkToken, saveToken } from "../../../apis/storage";
import { useTheme } from "@react-navigation/native";

const RegisterImage = ({ route, navigation }) => {
  const { username, password } = route.params;
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const { setUser } = useContext(UserContext);

  const theme = useTheme(); // Get the currently active theme

  const {
    mutate: registerFunction,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => {
      return register({ ...userInfo, image });
    },
    onSuccess: (data) => {
      saveToken(data.token);
      setUser(true);
    },
    onError: (err) => {
      console.log("========>", err);
    },
  });

  useEffect(() => {
    setUserInfo({ ...userInfo, username, password });
  }, []);

  const handleRegister = () => {
    // Perform registration logic here, such as calling an API
    // setUserInfo({ ...userInfo, image });
    registerFunction();
  };

  return (
    <View className="flex-1 items-center">
      <View className=" mt-24 mb-4 w-4/5">
        <Text
          style={{ color: theme.colors.text }}
          className=" text-xl text-center font-bold mb-4"
        >
          Pick an image
        </Text>
        <Text
          style={{ color: theme.colors.text }}
          className=" text-center mb-2"
        >
          Pick an image for your new account. You can always change it later.
        </Text>
      </View>
      <View className="flex-1 items-center justify-center top-[-15%]">
        <ImageHandler image={image} setImage={setImage} />
        <View className="mt-2">
          <Button title="Register" onPress={handleRegister} />
        </View>
      </View>
    </View>
  );
};

export default RegisterImage;

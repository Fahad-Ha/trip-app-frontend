import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { checkUsername } from "../../../apis/auth";
import { useMutation } from "@tanstack/react-query";
import { TouchableHighlight } from "react-native-gesture-handler";

// Define validation schema
const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .required("Username is required."),
});

const RegisterUsername = ({ navigation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [username, setUsername] = useState();
  const { mutate: userNamechecker } = useMutation({
    mutationFn: checkUsername,
    onSuccess: (data) => {
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
      if (data.message.includes("available")) {
        navigation.navigate("RegisterPassword", {
          username: username.toLowerCase(),
        });
      }
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  return (
    <Formik
      initialValues={{ username: "" }}
      validationSchema={UsernameSchema}
      onSubmit={(values) => {
        userNamechecker(values.username.toLowerCase());
        setUsername(values.username.toLowerCase());
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View className="flex-1 items-center ">
          <View className=" mt-24 mb-4 w-4/5">
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
            onBlur={handleBlur("username")}
            onChangeText={handleChange("username")}
            value={values.username}
            placeholderTextColor="#ffffffec"
          />
          {errors.username && touched.username && (
            <Text style={{ color: "red" }}>{errors.username}</Text>
          )}
          {suggestions.length > 0 && (
            <View className=" w-[70%]">
              <Text className=" text-[#ff0000] mb-2 ">
                username is taken, some suggestions:
              </Text>
              <View className=" flex-row flex-wrap mb-2">
                {suggestions.map((suggestion, index) => (
                  <TouchableHighlight
                    className=" m-1 bg-[#1c1c1c] h-8 rounded justify-center items-center p-2"
                    onPress={() => {
                      setFieldValue("username", suggestion);
                      setUsername(suggestion);
                    }}
                  >
                    <Text className="text-white " key={index}>
                      {suggestion}
                    </Text>
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          )}

          <Button title="Next" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default RegisterUsername;

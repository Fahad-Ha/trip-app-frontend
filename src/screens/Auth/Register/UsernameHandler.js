import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Define validation schema
const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .required("Username is required."),
});

const RegisterUsername = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ username: "" }}
      validationSchema={UsernameSchema}
      onSubmit={(values) => {
        navigation.navigate("RegisterPassword", {
          username: values.username.toLowerCase(),
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
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
          <Button title="Next" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default RegisterUsername;

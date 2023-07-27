import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Define validation schema
const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/\d/, "Password must contain a number.")
    .matches(/[A-Z]/, "Password must contain an uppercase letter.")
    .matches(/[a-z]/, "Password must contain a lowercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol.")
    .required("Password is required."),
});

const RegisterPassword = ({ route, navigation }) => {
  const { username } = route.params;

  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={PasswordSchema}
      onSubmit={(values) => {
        navigation.navigate("RegisterImage", {
          username,
          password: values.password,
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
              Pick a password
            </Text>
            <Text className=" text-[#ffffffec]  text-center mb-2">
              We cannot remember the password, so you need to enter it on every
              device you have even if it is on iCloud :)
            </Text>
          </View>
          <TextInput
            className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded bg-[#1c1c1c] text-white "
            placeholder="Password"
            secureTextEntry
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            value={values.password}
            placeholderTextColor="#ffffffec"
          />
          {errors.password && touched.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
          <Button title="Next" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default RegisterPassword;

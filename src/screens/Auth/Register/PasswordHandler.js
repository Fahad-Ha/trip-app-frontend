import React, { useState } from "react";
import {
  Button,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { Formik } from "formik";
import { FontAwesome } from "@expo/vector-icons";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
            className="w-4/5 h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded-xl bg-[#1c1c1c] text-white relative"
            placeholder="Password"
            secureTextEntry={!showPassword}
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            value={values.password}
            placeholderTextColor="#ffffffec"
          />

          <Pressable
            className="absolute p-2 top-56 mt-2 right-12"
            onPress={() => {
              toggleShowPassword();
            }}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={24}
              color="gray"
              style={{ marginTop: -12 }}
            />
          </Pressable>

          {errors.password && touched.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
          <View className="mt-2">
            <Button title="Next" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterPassword;

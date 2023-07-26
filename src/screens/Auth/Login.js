import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { login } from "../../apis/auth";
import { checkToken, saveToken } from "../../apis/storage";
import UserContext from "../../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";

// Define validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .required("Username is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/\d/, "Password must contain a number.")
    .matches(/[A-Z]/, "Password must contain an uppercase letter.")
    .matches(/[a-z]/, "Password must contain a lowercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol.")
    .required("Password is required."),
});

const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [backendError, setBackendError] = useState(null);

  const {
    mutate: loginFunction,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (userInfo) =>
      login({ ...userInfo, username: userInfo.username.toLowerCase() }),
    onSuccess: (data) => {
      saveToken(data.token);
      setUser(checkToken());
    },
    onError: (err) => {
      console.log("err", err);
      setBackendError(err.response.data.message); // Assuming error response is in this format
    },
  });

  const handleRegister = () => {
    navigation.navigate("RegisterUsername");
  };

  return (
    <View className="flex-1 items-center">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          loginFunction(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          // Move handleChangeAndResetError inside this function
          const handleChangeAndResetError = (field) => (text) => {
            setBackendError(null);
            handleChange(field)(text);
          };

          return (
            <View>
              <View className="w-4/5 mt-10 mb-4">
                <Text className="text-xl text-white text-center font-bold mb-4">
                  Login
                </Text>
                <Text className="text-white opacity-75 text-center mb-2">
                  Enter your username and password to login.
                </Text>
              </View>
              <TextInput
                className=" h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded bg-[#1c1c1c] text-white "
                placeholder="Username"
                onBlur={handleBlur("username")}
                onChangeText={handleChangeAndResetError("username")}
                value={values.username}
                placeholderTextColor="#ffffffec"
              />
              {errors.username && touched.username && (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              )}
              <TextInput
                className="h-12 mb-2 py-2 px-4 border-s border-gray-300 rounded bg-[#1c1c1c] text-white "
                placeholder="Password"
                onBlur={handleBlur("password")}
                onChangeText={handleChangeAndResetError("password")}
                value={values.password}
                secureTextEntry
                placeholderTextColor="#ffffffec"
              />
              {backendError && (
                <Text style={{ color: "red" }}>{backendError}</Text>
              )}
              {errors.password && touched.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
              <Button title="Login" onPress={handleSubmit} />
              <TouchableHighlight
                className="mt-2"
                onPress={handleRegister}
                underlayColor="#00000010"
              >
                <Text className="text-blue-500 text-center">
                  Don't have an account? Register
                </Text>
              </TouchableHighlight>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default Login;

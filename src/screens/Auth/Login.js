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
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

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
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme(); // Get the currently active theme

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    mutate: loginFunction,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (userInfo) =>
      login({ ...userInfo, username: userInfo.username.toLowerCase() }),
    onSuccess: (data) => {
      saveToken(data.token);
      setUser(true);
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
              <View className="w-4/5 mt-40 mb-4 ">
                <Text
                  style={{ color: theme.colors.text }}
                  className="text-xl  text-center font-bold mb-4"
                >
                  Login
                </Text>
                <Text
                  style={{ color: theme.colors.text }}
                  className=" opacity-75 text-center mb-2"
                >
                  Enter your username and password to login.
                </Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: theme.colors.inputBackground,
                  color: theme.colors.text,
                }}
                className=" h-12 mb-4 py-2 px-4 border-s border-gray-300 rounded-xl  "
                placeholder="Username"
                onBlur={handleBlur("username")}
                onChangeText={handleChangeAndResetError("username")}
                value={values.username}
                placeholderTextColor={theme.colors.inputPlaceholder}
              />
              {errors.username && touched.username && (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              )}
              <View className="relative">
                <TextInput
                  style={{
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                  }}
                  className="h-12 mb-4 py-2 px-4 border-s border-gray-300 rounded-xl "
                  placeholder="Password"
                  onBlur={handleBlur("password")}
                  onChangeText={handleChangeAndResetError("password")}
                  value={values.password}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={theme.colors.inputPlaceholder}
                />
                <Pressable
                  className="absolute p-2 top-4 right-2"
                  onPress={() => {
                    toggleShowPassword();
                  }}
                >
                  <FontAwesome
                    name={showPassword ? "eye" : "eye-slash"}
                    size={24}
                    color={theme.colors.text}
                    style={{ marginTop: -12, opacity: 0.6 }}
                  />
                </Pressable>
              </View>
              {backendError && (
                <Text style={{ color: "red" }}>{backendError}</Text>
              )}
              {errors.password && touched.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
              <View className="mt-2">
                <Button title="Login" onPress={handleSubmit} />
              </View>
              <TouchableHighlight
                onPress={handleRegister}
                underlayColor="#00000010"
              >
                <View className="flex-row justify-center items-center mt-2">
                  <Text
                    style={{ color: theme.colors.text }}
                    className=" text-center"
                  >
                    Don't have an account?
                  </Text>

                  <Text className="text-blue-500 font-semibold"> Register</Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default Login;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrip, getAllTrips } from "../apis/trips";
import React, { useState } from "react";
import TripImageHandler from "../components/TripImageHandler";
import { Formik } from "formik";
import * as Yup from "yup";
import ROUTES from "../navigation";
import { useTheme } from "@react-navigation/native";

// Define validation schema
const TripSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long.")
    .max(20, "Title must be less than 20 characters.")
    .required("Title is required."),
  description: Yup.string().max(
    400,
    "Description must be less than 400 characters."
  ),
  image: Yup.string().required("Image is required."),
});

export default function AddTrip({ navigation }) {
  const [backendError, setBackendError] = useState(null);
  const theme = useTheme(); // Get the currently active theme
  const inputBackgroundStyle = {
    backgroundColor: theme.colors.inputBackground,
  };

  const queryClient = useQueryClient(); // Import and use query client here

  const { mutate: addTripFunction } = useMutation({
    mutationFn: addTrip,
    onSuccess: () => {
      queryClient.invalidateQueries("trips");
      navigation.navigate(ROUTES.APPROUTES.EXPLORE);
    },
    onError: (err) => {
      console.log("err", err);
      setBackendError(err.response.data.message); // Assuming error response is in this format
    },
  });

  return (
    <Formik
      initialValues={{ title: "", description: "", image: "" }}
      validationSchema={TripSchema}
      onSubmit={(values, { resetForm }) => {
        addTripFunction(values);
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <ScrollView contentContainerStyle={{}}>
          <View className="mb-40 items-center ">
            <View className=" w-[70%]  mt-8 min-h-[100%]">
              <View>
                <Text style={{ color: theme.colors.text, marginBottom: 1 }}>
                  Title
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                  }}
                  className="rounded-xl  mb-1 p-2"
                  placeholder="Title.."
                  onBlur={handleBlur("title")}
                  onChangeText={handleChange("title")}
                  value={values.title}
                  placeholderTextColor={theme.colors.inputPlaceholder}
                />
                {errors.title && touched.title && (
                  <Text style={{ color: "red" }}>{errors.title}</Text>
                )}
              </View>
              <View>
                <Text
                  style={{ color: theme.colors.text }}
                  className="mb-1 mt-4  "
                >
                  Description
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                  }}
                  className="rounded-xl  text-white p-2 mb-1"
                  multiline={true}
                  returnKeyType="done"
                  placeholder="Description.."
                  onBlur={handleBlur("description")}
                  onChangeText={handleChange("description")}
                  value={values.description}
                  placeholderTextColor={theme.colors.inputPlaceholder}
                />
                {errors.description && touched.description && (
                  <Text style={{ color: "red" }}>{errors.description}</Text>
                )}
              </View>
              <Text style={{ color: theme.colors.text }} className="mt-4 mb-1 ">
                Image
              </Text>
              <View className="mb-1">
                <TripImageHandler
                  image={values.image}
                  setImage={(image) => {
                    setFieldValue("image", image);
                  }}
                />
              </View>
              {errors.image && touched.image && (
                <Text style={{ color: "red" }}>{errors.image}</Text>
              )}
              {backendError && (
                <Text style={{ color: "red" }}>{backendError}</Text>
              )}
              <View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-[#1C535A] rounded-xl items-center p-5 mt-6"
                >
                  <Text className="text-white text-xl font-semibold">
                    Add the trip
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

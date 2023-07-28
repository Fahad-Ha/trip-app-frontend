import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import ROUTES from ".";

import AddTrip from "../screens/AddTrip";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { View, StyleSheet, Pressable } from "react-native";

import UserProfile from "../screens/Auth/Profile/UserProfile";
import ExploreStack from "./ExploreStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          // backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 70,
          // ...styles.shadow,
          size: 90,
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.APPROUTES.EXPLORE}
        component={ExploreStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search"
              color={color}
              size={40}
              style={{ marginTop: 25, height: 40 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.ADD_TRIP}
        component={AddTrip}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="plus-square"
              size={50}
              color={color}
              style={{ marginTop: 25, height: 50 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.PROFILE}
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="user-circle-o"
              size={40}
              color={color}
              style={{ marginTop: 25, height: 40 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  shadowTop: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

//   ({ navigation }) => {
//   const colors = {
//     active: {
//       primary:  "#1C535A",
//     },
//     inActive: {
//       primary: "gray",
//     },
//   };

//   return {
//     tabBarButton: (props) => {
//       return (
//         <Pressable
//           style={{
//             flex: 1,
//             bottom: 20,
//             borderRadius: 100,
//             height: 80,
//             maxWidth: 80,
//             overflow: "hidden",
//             borderWidth: 4,
//             borderColor:
//               colors[navigation.isFocused() ? "active" : "inActive"]
//                 .primary,
//             ...styles.shadow,
//           }}
//           onPress={() => navigation.navigate(ROUTES.APPROUTES.ADD_TRIP)}
//         >
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "white",
//             }}
//           >
//             <Ionicons
//               name="add"
//               size={52}
//               color={
//                 colors[navigation.isFocused() ? "active" : "inActive"]
//                   .primary
//               }
//             />
//           </View>
//         </Pressable>
//       );
//     },
//   };
// }

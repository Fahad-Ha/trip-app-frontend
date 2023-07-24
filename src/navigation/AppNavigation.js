import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"; // Import getFocusedRouteNameFromRoute

import ROUTES from ".";
import Explore from "../screens/Explore";
import AddTrip from "../screens/AddTrip";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Tab = createBottomTabNavigator();

// const focusedRouteName = getFocusedRouteNameFromRoute(route);

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          display: "none", // Hide labels on focus for the "AddTrip" tab
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 70,
          overflow: "hidden",
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen name={ROUTES.APPROUTES.EXPLORE} component={Explore} />
      <Tab.Screen
        options={({ route, focused }) => ({
          tabBarIconStyle: {
            backgroundColor:
              route.name == ROUTES.APPROUTES.ADD_TRIP ? "blue" : "black",
            borderRadius: 15,
            width: 60,
            marginVertical: 5,
            ...styles.shadow,
          },
          headerShown: false,
          tabBarShowLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={"white"} size={32} />
          ),
        })}
        name={ROUTES.APPROUTES.ADD_TRIP}
        component={AddTrip}
      />
      <Tab.Screen name={ROUTES.APPROUTES.PROFILE} component={AddTrip} />
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
});

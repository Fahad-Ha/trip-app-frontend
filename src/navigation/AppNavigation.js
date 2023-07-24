import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ROUTES from ".";
import Explore from "../screens/Explore";
import AddTrip from "../screens/AddTrip";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";

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
          // overflow: "hidden",
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.APPROUTES.EXPLORE}
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.ADD_TRIP}
        component={AddTrip}
        options={({ navigation }) => {
          console.log(navigation);

          const colors = {
            active: {
              primary: "#312e81",
            },
            inActive: {
              primary: "#4f46e5",
            },
          };

          return {
            tabBarButton: (props) => {
              return (
                <Pressable
                  style={{
                    flex: 1,
                    bottom: 30,
                    borderRadius: 100,
                    height: 80,
                    maxWidth: 80,
                    overflow: "hidden",
                    ...styles.shadow,
                  }}
                  onPress={() => navigation.navigate(ROUTES.APPROUTES.ADD_TRIP)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        colors[navigation.isFocused() ? "active" : "inActive"]
                          .primary,
                    }}
                  >
                    <Ionicons name="add" size={52} color={"white"} />
                  </View>
                </Pressable>
              );
            },
          };
        }}
      />
      <Tab.Screen
        name={ROUTES.APPROUTES.PROFILE}
        component={AddTrip}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="circle" color={color} size={size} />
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

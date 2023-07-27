import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import PasswordHandler from "../screens/Auth/Register/PasswordHandler";
import UsernameHandler from "../screens/Auth/Register/UsernameHandler";
import ImageHandler from "../screens/Auth/Register/ImageHandler";

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RegisterUsername"
        component={UsernameHandler}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterPassword"
        component={PasswordHandler}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterImage"
        component={ImageHandler}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

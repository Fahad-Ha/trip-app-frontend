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
      <Stack.Screen name="Login" component={Login} options={{ title: "" }} />

      <Stack.Screen
        name="RegisterUsername"
        component={UsernameHandler}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RegisterPassword"
        component={PasswordHandler}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RegisterImage"
        component={ImageHandler}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

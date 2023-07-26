import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/AppNavigation";

import AuthNavigation from "./src/navigation/AuthNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import { getToken } from "./src/apis/storage";

const DarkTheme = {
  dark: true,
  colors: {
    primary: "green",
    background: "#232323",
    card: "transparent",
    text: "#ffffff80",
    border: "#ffffff",
    notification: "rgb(255, 69, 58)",
  },
};
const LightTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "white",
    card: "transparent",
    text: "#ffffff80",
    border: "#000000",
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  const [user, setUser] = useState(false);

  const getUser = async () => {
    const token = await getToken();
    if (token) setUser(true);
  };
  useEffect(() => {
    // getUser();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={DarkTheme}>
          {!user ? <AuthNavigation /> : <AppNavigation />}
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

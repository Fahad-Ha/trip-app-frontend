import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import AuthNavigation from "./src/navigation/AuthNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import { getToken } from "./src/apis/storage";
import { LogBox } from "react-native";
import SideDrawer from "./src/navigation/ProfileDrawer";
import { MenuProvider } from "react-native-popup-menu";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const DarkTheme = {
  dark: true,
  colors: {
    primary: "#1C535A",
    background: "#000000",
    card: "transparent",
    text: "#ffffff80",
    // border: "#ffffff",
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

  const checkToken = async () => {
    const token = await getToken();

    if (token) {
      setUser(true);
    }
  };
  useEffect(() => {
    checkToken();
  }, [user]);
  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
      <MenuProvider overlayColor="rgba(0, 0, 0, 0.3)">
        <NavigationContainer theme={DarkTheme}>
          {!user ? <AuthNavigation /> : <SideDrawer />}
        </NavigationContainer>
        </MenuProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

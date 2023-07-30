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
import Notifications from "./src/components/Notifications";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const DarkTheme = {
  dark: true,
  colors: {
    primary: "#1C535A",
    background: "#0d0d0d",
    card: "transparent",
    text: "#F8F8F8",
    inputText: "#FFFFFF", // Text color for text inputs
    inputBackground: "#1c1c1c", // Background color for text inputs
    inputPlaceholder: "#FFFFFF40", // Color for input placeholders
    // border: "#ffffff",
    notification: "rgb(255, 69, 58)",
    GradientColors: ["#000000", "#1C535A"],
  },
};
const LightTheme = {
  dark: false,
  colors: {
    primary: "#40E0D0",
    background: "#F8F8F8",
    card: "#F8F8F8",
    text: "black",

    border: "#000000",
    notification: "rgb(255, 69, 58)",
    inputText: "red", // Text color for text inputs
    inputBackground: "#EAEAEA", // Background color for text inputs
    inputPlaceholder: "#00000080", // Color for input placeholders
    GradientColors: ["rgba(255, 255, 255, 0.00)", "#1C535A"],
  },
};

export default function App() {
  const [user, setUser] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const checkToken = async () => {
    const token = await getToken();

    if (token) {
      setUser(true);
    }
  };

  const toggleDarkMode = () => {
    // Implement your dark mode logic here
    setIsDarkMode((prev) => !prev);
  };
  useEffect(() => {
    checkToken();
  }, [user]);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <MenuProvider overlayColor="rgba(0, 0, 0, 0.3)">
          <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
            <Notifications />
            {!user ? (
              <AuthNavigation />
            ) : (
              <SideDrawer
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            )}
          </NavigationContainer>
        </MenuProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

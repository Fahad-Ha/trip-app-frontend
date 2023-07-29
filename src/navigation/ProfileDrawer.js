import { createDrawerNavigator } from "@react-navigation/drawer";
import AppNavigation from "./AppNavigation";
import { Switch, Text, View } from "react-native";
import { useContext, useState } from "react";
import ROUTES from ".";
import UserProfile from "../screens/Auth/Profile/UserProfile";
import Logout from "../components/Logout";

const Drawer = createDrawerNavigator();

// Custom Drawer Content Component
const CustomDrawerContent = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <View
      className="bg-[#1C535A]"
      style={{
        flex: 1,
        padding: 16,
        marginTop: 20,
      }}
    >
      <View className="rounded-lg bg-red-200 my-auto">
        <Logout />
      </View>
      {/* Dark Mode Toggle */}
      <View
        className=" justify-center items-center pb-2 mt-auto "
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Text
          className="text-xl mx-auto text-gray-100"
          style={{
            marginLeft: 8,
          }}
        >
          Dark Mode
        </Text>
        <Switch
          className="scale-125 mx-auto"
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
    </View>
  );
};

export default function SideDrawer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // Implement your dark mode logic here
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={() => (
        <CustomDrawerContent
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      )} // Set the custom drawer content component
      screenOptions={{
        drawerPosition: "right",

        headerShown: false, // Hide the header for all screens within the drawer
      }}
    >
      <Drawer.Screen
        name={ROUTES.APPROUTES.PROFILE}
        component={AppNavigation}
      />

      {/* <Drawer.Screen name="Dark Mode Settings" component={DarkModeSettings} /> */}
    </Drawer.Navigator>
  );
}

import { createDrawerNavigator } from "@react-navigation/drawer";
import AppNavigation from "./AppNavigation";
import { Switch, Text, View, Profile, Pressable } from "react-native";
import { useContext, useState } from "react";
import ROUTES from ".";
import UserProfile from "../screens/Auth/Profile/UserProfile";
import Logout from "../components/Logout";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import LikedTrips from "../screens/Auth/Profile/LikedTrips";
import { useNavigation } from "@react-navigation/native";
import SavedTrips from "../screens/Auth/Profile/SavedTrips";
import ProfileStack from "./ProfileStack";

const Drawer = createDrawerNavigator();

// Custom Drawer Content Component
const CustomDrawerContent = ({ toggleDarkMode, isDarkMode }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        flex={1}
        colors={["#000000", "#1C535A"]}
        start={[3, 0]}
        end={[1, 1]}
      >
        <View className="mt-[100%] items-center">
          <Pressable
            onPress={() =>
              navigation.navigate(`${ROUTES.APPROUTES.PROFILE_SAVED_TRIPS}`)
            }
          >
            <View className="rounded-xl mx-10 items-center flex-row">
              <Ionicons name="bookmark-outline" size={24} color="white" />
              <Text className="text-2xl p-2 text-gray-100  my-auto  ">
                Saved Trips
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate(`${ROUTES.APPROUTES.PROFILE_LIKED_TRIPS}`)
            }
          >
            <View className="rounded-xl mx-10  items-center mt-6 flex-row">
              <FontAwesome name="heart-o" size={24} color="white" />
              <Text className="text-2xl p-2 text-gray-100  my-auto">
                Liked Trips
              </Text>
            </View>
          </Pressable>
        </View>
        <View className="rounded-xl  mx-10 justify-center items-center p-1 mt-auto flex-row">
          <Ionicons name="exit-outline" size={24} color="white" />
          <Logout />
        </View>
        {/* Dark Mode Toggle */}
        <View
          className=" justify-center items-center pb-2 mt-auto "
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text className="text-xl mx-auto text-gray-100">Dark Mode</Text>
          <Switch
            className="scale-125 mx-auto"
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default function SideDrawer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // Implement your dark mode logic here
    setIsDarkMode((prev) => !prev);
  };
  const useLegacyImplementation = Platform.OS !== "android";

  return (
    <Drawer.Navigator
      useLegacyImplementation={useLegacyImplementation}
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

import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";

import UserProfile from "../screens/Auth/Profile/UserProfile";
import Followers from "../screens/Auth/Profile/Followers";
import Followings from "../screens/Auth/Profile/Followings";
import Profile from "../screens/Auth/Profile/Profile";
import OtherUserProfile from "../screens/Auth/Profile/OtherUserProfile";
import TripDetail from "../screens/TripDetail";
import { View } from "react-native";
import OtherFollowings from "../screens/Auth/Profile/OtherFollowings";
import OtherFollowers from "../screens/Auth/Profile/OtherFollowers";
import AppNavigation from "./AppNavigation";
import LikedTrips from "../screens/Auth/Profile/LikedTrips";
import SavedTrips from "../screens/Auth/Profile/SavedTrips";

const Stack = createStackNavigator();
const BlankHeader = () => (
  <View style={{ height: 103, backgroundColor: "transparent" }} />
);

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.APPROUTES.PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.OTHERPROFILE}
        component={OtherUserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.FOLLOWERS}
        component={Followers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.FOLLOWINGS}
        component={Followings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.OTHERFOLLOWERS}
        component={OtherFollowers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.OTHERFOLLOWINGS}
        component={OtherFollowings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.PROFILE_TRIP_DETAIL}
        component={TripDetail}
        options={{ header: () => <BlankHeader /> }}
      />

      <Stack.Screen
        name={ROUTES.APPROUTES.PROFILE_SAVED_TRIPS}
        component={SavedTrips} // Render the bottom tab navigator here
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.PROFILE_LIKED_TRIPS}
        component={LikedTrips}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

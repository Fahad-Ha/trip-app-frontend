import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";

import UserProfile from "../screens/Auth/Profile/UserProfile";
import Followers from "../screens/Auth/Profile/Followers";
import Followings from "../screens/Auth/Profile/Followings";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.APPROUTES.PROFILE}
        component={UserProfile}
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
    </Stack.Navigator>
  );
}

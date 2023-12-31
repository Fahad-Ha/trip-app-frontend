import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import MyExplorePage from "../screens/MyExplorePage";
import TripDetail from "../screens/TripDetail";
import OtherUserProfile from "../screens/Auth/Profile/OtherUserProfile";
import OtherFollowers from "../screens/Auth/Profile/OtherFollowers";
import OtherFollowings from "../screens/Auth/Profile/OtherFollowings";
import HashtagTrips from "../screens/HashtagTrips";

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.APPROUTES.EXPLORE}
        component={MyExplorePage}
        options={{ title: "Explore" }}
      />

      <Stack.Screen
        name={ROUTES.APPROUTES.TRIP_DETAIL}
        component={TripDetail}
        options={{ title: "Explore", headerLeft: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.OTHERPROFILEEXPLORE}
        component={OtherUserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.OTHERFOLLOWERS_EXPLORE}
        component={OtherFollowers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.OTHERFOLLOWINGS_EXPLORE}
        component={OtherFollowings}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={ROUTES.APPROUTES.HASHTAG_EXPLORE}
        component={HashtagTrips}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

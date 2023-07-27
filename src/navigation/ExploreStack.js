import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import MyExplorePage from "../screens/MyExplorePage";
import TripDetail from "../screens/TripDetail";

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.APPROUTES.EXPLORE}
        component={MyExplorePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.APPROUTES.TRIP_DETAIL}
        component={TripDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import ExplorePage from "../components/ExplorePage";
import MyExplorePage from "../screens/MyExplorePage";

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.APPROUTES.EXPLORE}
        component={MyExplorePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

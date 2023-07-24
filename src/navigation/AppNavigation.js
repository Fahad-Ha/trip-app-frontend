import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from ".";
import Explore from "../screens/Explore";
import AddTrip from "../screens/AddTrip";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name={ROUTES.APPROUTES.EXPLORE} component={Explore} />
      <Tab.Screen name={ROUTES.APPROUTES.ADD_TRIP} component={AddTrip} />
      <Tab.Screen name={ROUTES.APPROUTES.PROFILE} component={AddTrip} />
    </Tab.Navigator>
  );
}

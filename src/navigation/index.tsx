import DashboardScreen from "../screens/Dashboard";
import AddPlantScreen from "../screens/AddPlantScreen";
import TipScreen from "../screens/TipScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, SunIcon } from "@/components/ui/icon";
import LogIn from "../screens/LogIn";
import { View } from "react-native";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const LogInTab = () => {
    return (
        <Stack.Navigator>
            <Tab.Screen name="LogIn" component={LogIn} options={() => ({
                tabBarStyle: { display: "none" },
                headerStyle: { display: "none" },
                headerShown: false
            })} />
        </Stack.Navigator>
    )
}


export default function Navigation() {
    const isLoggedIn = false

    return (
        <Tab.Navigator>
            {isLoggedIn ? (
                <>
                    <Tab.Screen name="Dashboard" component={DashboardScreen} options={({ route }) => ({ tabBarIcon: ({ }) => <Icon as={SunIcon} /> })} />
                    <Stack.Screen name="AddPlant" component={AddPlantScreen} options={{ title: 'Add Plant' }} />
                    <Stack.Screen name="Tips" component={TipScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                </>
            )
                :
                <Tab.Screen name="LogIn" component={LogIn} options={() => ({
                    tabBarStyle: { display: "none" },
                    headerStyle: { display: "none" },
                    headerShown: false
                })} />}
        </Tab.Navigator>
    )
}
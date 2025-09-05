import Home from "../screens/Home";
import AddPlant from "../screens/AddPlant";
import Tips from "../screens/Tips";
import SettingsScreen from "../screens/Settings";
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddIcon, Icon, InfoIcon, SettingsIcon, SunIcon } from "@/components/ui/icon";
import Guest from "../screens/Guest";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import Auth from "../screens/Auth";
import useAuth from "../hooks/useAuth";
import SinglePlant from "../screens/SinglePlant";

type NestedStackParamList = {
    SinglePlant: { id: string };
}
const Stack = createNativeStackNavigator<NestedStackParamList>()

export type RootStackParamList = {
    HomeTabs: undefined;
    SinglePlant: { id: string };
    Auth: { authType: "signIn" | "signUp", errorMessage: string | null };
    NoSession: undefined;
    NestedStack: NavigatorScreenParams<NestedStackParamList>;
};

export type HomeTabParamList = {
    Home: undefined;
    "Add Plant": undefined;
    Tips: undefined;
    Settings: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>
export type AuthProps = NativeStackScreenProps<RootStackParamList, 'Auth'>
export type SinglePlantProps = NativeStackScreenProps<RootStackParamList, 'SinglePlant'>;
const RootStack = createNativeStackNavigator<RootStackParamList>();

const BottomTabIcon = (props: any) => {
    const { focused, icon } = props
    return <Icon as={icon} className={`${focused ? 'color-primaryGreen' : 'color-gray-500'}`} />
}

const MainTabNavigator = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#14905C' }}>
            <Tab.Screen name="Home" component={Home} options={() => ({ tabBarIcon: ({ focused }) => <BottomTabIcon icon={SunIcon} focused={focused} /> })} />
            <Tab.Screen name="Add Plant" component={AddPlant} options={{ title: 'Add Plant', tabBarIcon: ({ focused }) => <BottomTabIcon icon={AddIcon} focused={focused} /> }} />
            <Tab.Screen name="Tips" component={Tips} options={() => ({ tabBarIcon: ({ focused }) => <BottomTabIcon icon={InfoIcon} focused={focused} /> })} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={() => ({ tabBarIcon: ({ focused }) => <BottomTabIcon icon={SettingsIcon} focused={focused} /> })} />
        </Tab.Navigator>
    );
};

const NoSessionTabNavigator = () => {
    const NoSessionTab = createBottomTabNavigator();

    return (
        <NoSessionTab.Navigator>
            <NoSessionTab.Screen name="Guest" component={Guest} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
        </NoSessionTab.Navigator>
    );
};

export const PlantStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SinglePlant" component={SinglePlant} />
        </Stack.Navigator>
    );
};

export default function Navigation() {
    const { user } = useAuth()

    return (
        <RootStack.Navigator screenOptions={{ headerTintColor: '#14905C' }}>
            {user ? (
                <RootStack.Group>
                    <RootStack.Screen name="HomeTabs" component={MainTabNavigator} options={{ headerShown: false }} />
                    <RootStack.Screen name="NestedStack" component={PlantStack} options={{ headerBackTitle: 'Home', presentation: 'card' }} />
                </RootStack.Group>
            ) : (
                <>
                    <RootStack.Screen name="NoSession" component={NoSessionTabNavigator} options={{ headerShown: false }} />
                    <RootStack.Screen name="Auth" component={Auth} options={({ route }) => ({
                        // headerTitle: '',
                        presentation: 'modal',
                        headerShown: true,
                        headerLeft: () => {
                            const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
                            return (
                                <TouchableOpacity onPress={() => navigation.goBack()} className="ml-10">
                                    <Text className="text-primaryGreen size-36 font-medium justify-center h-full">Back</Text>
                                </TouchableOpacity>
                            );
                        }
                    })} />
                </>
            )}
        </RootStack.Navigator>
    );
}
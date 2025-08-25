import Home from "../screens/Home";
import AddPlant from "../screens/AddPlant";
import Tips from "../screens/Tips";
import SettingsScreen from "../screens/Settings";
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, SunIcon } from "@/components/ui/icon";
import Guest from "../screens/Guest";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import Auth from "../screens/Auth";
import useAuth from "../hooks/useAuth";

export type RootStackParamList = {
    Guest: undefined,
    "Add Plant": undefined,
    Home: undefined
    Tips: undefined
    Settings: undefined
    NoSession: undefined
    Auth: { authType: "signIn" | "signUp", errorMessage: string | null }
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>
export type AuthProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator()

const NoSession = () => {
    return (
        <Tab.Navigator initialRouteName="Guest">
            <Tab.Screen name="Guest" component={Guest} options={() => ({
                tabBarStyle: { display: "none" },
                headerShown: false,
            })} />
        </Tab.Navigator>
    )
}


export default function Navigation() {
    const { user } = useAuth()

    return (
        <Tab.Navigator>
            {user ? (
                <>
                    <Tab.Screen name="Home" component={Home} options={({ route }) => ({ tabBarIcon: ({ }) => <Icon as={SunIcon} /> })} />
                    <Stack.Screen name="Add Plant" component={AddPlant} options={{ title: 'Add Plant' }} />
                    <Stack.Screen name="Tips" component={Tips} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                </>
            )
                :
                <>
                    <Tab.Screen name="NoSession" component={NoSession} options={() => ({
                        headerShown: false,
                        tabBarStyle: { display: "none" },

                    })} />
                    <Stack.Group screenOptions={{presentation: 'modal'}}>

                    <Stack.Screen name="Auth" component={Auth} options={() => ({
                        tabBarStyle: { display: "none" },
                        presentation: 'modal',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#F0F8F5',
                        },
                        headerLeft: () => {
                            const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
                            return (
                                <TouchableOpacity onPress={() => navigation.goBack()} className="ml-10">
                                    <Text className="text-primaryGreen size-36 font-medium justify-center h-full">Back</Text>
                                </TouchableOpacity>
                            )
                        }
                    })} />
                    </Stack.Group>
                </>
            }
        </Tab.Navigator>
    )
}
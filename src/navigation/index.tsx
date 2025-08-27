import Home from "../screens/Home";
import AddPlant from "../screens/AddPlant";
import Tips from "../screens/Tips";
import SettingsScreen from "../screens/Settings";
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddIcon, Icon, InfoIcon, SettingsIcon, SunIcon } from "@/components/ui/icon";
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

const BottomTabIcon = (props: any) => {
    const { focused, icon } = props
    return <Icon as={icon} className={`${focused ? 'color-primaryGreen' : 'color-gray-500'}`} />
}

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
    console.log(user);
    
    return (
        <Tab.Navigator {...{ screenOptions: { headerTintColor: '#14905C' } }}>
            {user ? (
                <Tab.Group screenOptions={{ tabBarActiveTintColor: '#14905C' }}>
                    <Tab.Screen name="Home" component={Home} options={() => ({ tabBarIcon: ({ focused }) => <BottomTabIcon icon={SunIcon} focused={focused} /> })} />
                    <Tab.Screen name="Add Plant" component={AddPlant} options={{ title: 'Add Plant', tabBarIcon: ({ focused }) => <BottomTabIcon icon={AddIcon} focused={focused} /> }} />
                    <Tab.Screen name="Tips" component={Tips} options={() => ({ tabBarIcon: ({ focused }) => <BottomTabIcon icon={InfoIcon} focused={focused} /> })} />
                    <Tab.Screen name="Settings" component={SettingsScreen} options={() => ({ tabBarIcon: ({ focused }) => <BottomTabIcon icon={SettingsIcon} focused={focused} /> })} />
                </Tab.Group>
            )
                :
                <>
                    <Tab.Screen name="NoSession" component={NoSession} options={() => ({
                        headerShown: false,
                        tabBarStyle: { display: "none" },

                    })} />
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="Auth" component={Auth} options={({ route }) => ({
                            tabBarStyle: { display: "none" },
                            headerTitle: '',
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
import { SafeAreaView, View } from "react-native";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text"
import { useNavigation } from "@react-navigation/native";
import AuthButton from "../components/shared/AuthButton";
import { NavigationProps } from "../navigation";

export default function Guest() {
    const navigation = useNavigation<NavigationProps>()
    const navigate = (authType: 'signIn' | 'signUp') => navigation.navigate('Auth', { authType })

    return (
        <SafeAreaView className="flex-1 bg-tertiaryGreen">
            <View className="m-5 flex-1 justify-end">
                <Text size="4xl" className="text-center h-1/2 color-primaryGreen">Welcome to GardenMate</Text>
                <View className="align-bottom">
                    <AuthButton text={"Sign in"} onPress={() => navigate("signIn" )} backgroundColor="bg-primaryGreen" variant="solid" action="primary"/>
                    <View className="flex-row justify-center">
                        <Divider className="w-28 my-3 mr-4" />
                        <Text>or</Text>
                        <Divider className="w-28 my-3 ml-4" />
                    </View>
                    <AuthButton text={"Sign up"} onPress={() => navigate("signUp")} backgroundColor="bg-primary-200" variant="solid" action="default"/>
                </View>
            </View>
        </SafeAreaView>
    )
}
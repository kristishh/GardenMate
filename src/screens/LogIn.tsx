import { SafeAreaView, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text"


export default function LogIn() {
    return (
        <SafeAreaView className="flex-1 justify-center">

            <Button className="bg-primaryGreen m-20" size="lg" variant="solid" action="default">
                <ButtonText className="font-helvetica">Login</ButtonText>
            </Button>
            <View className="flex-row align-middle justify-center">
            <Divider className="w-28 my-3 mr-4"/>
                <Text>or</Text>
            <Divider className="w-28 my-3 ml-4"/>
            </View>
            <Button className="bg-primary-100 m-20" size="lg" action="default">
                <ButtonText className="font-helvetica">Sign up</ButtonText>
            </Button>
        </SafeAreaView>
    )
}
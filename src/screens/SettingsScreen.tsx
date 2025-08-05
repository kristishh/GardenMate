import { Button, ButtonText } from "@/components/ui/button";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { Text, View } from "react-native";

export default function SettingsScreen() {
    
    return (
        <View>
            <Text>Settings</Text>
            <Button variant="solid"  className="bg-error-500 mx-40" >
                <ButtonText variant="outline" onPress={() => signOut(auth)}>Log out</ButtonText>
            </Button>
        </View>
    )
}
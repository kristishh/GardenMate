import { View } from "react-native";
import AuthForm from "../components/shared/AuthForm";
import { AuthProps } from "../navigation";


export default function Auth({navigation, route}: AuthProps) {
    const handleSubmit = (password: string) => {
        if (password.length < 6) {
            return true
        } else {
            false
        }
    }
    return (
        <View className="h-full p-5 bg-tertiaryGreen">
            <AuthForm authType={route.params.authType} onSubmit={handleSubmit} />
        </View>
    )
}
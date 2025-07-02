import { View } from "react-native";
import AuthForm from "../components/shared/AuthForm";
import { AuthProps } from "../navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "@/firebaseConfig";
import { useState } from "react";

export default function Auth({ navigation, route }: AuthProps) {
    const isSignUpFlow = route.params.authType === "signUp"
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async ({ email, password, passwordConfirmation }: { email: string, password: string, passwordConfirmation: string }) => {
        try {
            if (isSignUpFlow && password !== passwordConfirmation) {
                setError("Passwords are not matching")
            } else {
                if (route.params.authType === 'signIn') {
                    await signInWithEmailAndPassword(auth, email, password)
                } else {
                    await createUserWithEmailAndPassword(auth, email, password)
                }
            }
        } catch (error: any) {
            switch (error.code) {
                case 'auth/missing-email':
                    return setError("Provide an email.")
                case 'auth/invalid-email':
                    return setError("Provide a valid email.")
                case 'auth/missing-password':
                    return setError("Provide a password.")
                case 'auth/weak-password':
                    return setError("Provide atleast 6 characters long password.")
                case 'auth/invalid-credential':
                    return setError("Provide a valid password.")
                default:
                    return setError("You're unable to authenticate")
            }
        }
    }


    return (
        <View className="h-full p-5 bg-tertiaryGreen">
            <AuthForm authType={route.params.authType} submitAuth={handleSubmit} errorMessage={error} />
        </View>
    )
}
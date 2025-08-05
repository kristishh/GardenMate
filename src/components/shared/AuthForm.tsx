import { FormControl, FormControlErrorText } from "@/components/ui/form-control";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@/src/navigation";
import InputField from "./InputField";

export type Props = {
    authType: 'signIn' | 'signUp'
    errorMessage: string | null
    submitAuth({ email, password, passwordConfirmation }: { email: string, password: string, passwordConfirmation: string }): void
}


export default function AuthForm({ authType, errorMessage, submitAuth }: Props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const screenText = authType === "signUp" ? 'Sign up' : 'Sign in'
    const isSignUpFlow = authType === "signUp"

    const handleSubmit = () => {
        submitAuth({ email, password, passwordConfirmation })
    }

    useEffect(() => {
        Keyboard.dismiss
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="py-10 px-10 h-full justify-between">
                    <FormControl
                        size="md"
                        isDisabled={false}
                        isReadOnly={false}
                        isRequired={false}
                        className="gap-y-5"
                    >
                        <InputField
                            labelText="Email"
                            isInvalid={errorMessage?.includes('email') || false}
                            inputType="text"
                            inputValue={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <InputField
                            labelText="Password"
                            isInvalid={errorMessage?.includes('password') || false}
                            inputType="password"
                            inputValue={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {isSignUpFlow && (
                            <InputField
                                labelText="Confirm Password"
                                isInvalid={errorMessage === 'Passwords are not matching' || false}
                                inputType="password"
                                inputValue={passwordConfirmation}
                                onChangeText={(text) => setPasswordConfirmation(text)}
                            />
                        )}
                        {errorMessage && (<FormControlErrorText className="my-5 w-fit justify-center align-middle">
                            {errorMessage}
                        </FormControlErrorText>)}
                    </FormControl>
                    <AuthButton text={screenText} onPress={handleSubmit} backgroundColor="bg-primaryGreen" variant="solid" action="primary" />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
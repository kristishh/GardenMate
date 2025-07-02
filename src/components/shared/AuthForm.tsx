import { FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@/src/navigation";
import { UserCredential } from "firebase/auth";

export type Props = {
    authType: 'signIn' | 'signUp'
    errorMessage: string | null
    submitAuth({ email, password, passwordConfirmation }: { email: string, password: string, passwordConfirmation: string }): void
}


export default function AuthForm({ authType, errorMessage, submitAuth }: Props) {
    const navigation = useNavigation<NavigationProps>()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const screenText = authType === "signUp" ? 'Sign up' : 'Sign in'
    const isSignUpFlow = authType === "signUp"

    const handleSubmit = async () => {
        await submitAuth({ email, password, passwordConfirmation })
    }

    useEffect(() => {
        Keyboard.dismiss
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="py-10 px-10 h-full justify-between">
                    <FormControl
                        size="md"
                        isDisabled={false}
                        isReadOnly={false}
                        isRequired={false}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input isInvalid={errorMessage?.includes('email')} className="my-1" size={"md"} variant="rounded">
                            <InputField
                                type="text"
                                placeholder="email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </Input>
                        <FormControlLabel className="mt-5">
                            <FormControlLabelText>Password</FormControlLabelText>
                        </FormControlLabel>
                        <Input isInvalid={errorMessage?.includes('password')} className="my-1" size={"md"} variant="rounded">
                            <InputField
                                type="password"
                                placeholder="password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </Input>
                        {isSignUpFlow && (
                            <View>
                                <FormControlLabel className="mt-5">
                                    <FormControlLabelText>Confirm Password</FormControlLabelText>
                                </FormControlLabel>
                                <Input isInvalid={errorMessage === 'Passwords are not matching'} className="my-1" size={"md"} variant="rounded">
                                    <InputField
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={passwordConfirmation}
                                        onChangeText={(text) => setPasswordConfirmation(text)}
                                    />
                                </Input>
                            </View>
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
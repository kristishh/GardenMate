import { FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@/src/navigation";

export type Props = {
    authType: 'signIn' | 'signUp'
    onSubmit(email: string, password: string): void
}


export default function AuthForm({authType, onSubmit}: Props) {
    const navigation = useNavigation<NavigationProps>()
    const [isInvalid, setIsInvalid] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const screenText = authType === "signUp" ? 'Sign up' : 'Sign in'
    const isSignUpFlow = authType === "signUp"

    useEffect(() => {
        navigation.setOptions({title: screenText})
    }, [])
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="py-10 px-10 h-full justify-between ">
                    <FormControl
                        isInvalid={isInvalid}
                        size="md"
                        isDisabled={false}
                        isReadOnly={false}
                        isRequired={false}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input className="my-1" size={"md"} variant="rounded">
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
                        <Input className="my-1" size={"md"} variant="rounded">
                            <InputField
                                type="password"
                                placeholder="password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </Input>
                        <FormControlHelper>
                            <FormControlHelperText>
                                Must be atleast 6 characters.
                            </FormControlHelperText>
                        </FormControlHelper>
                        <FormControlError>
                            <FormControlErrorText>
                                Atleast 6 characters are required.
                            </FormControlErrorText>
                        </FormControlError>
                        {isSignUpFlow && (
                            <View>
                                <FormControlLabel className="mt-5">
                                    <FormControlLabelText>Confirm Password</FormControlLabelText>
                                </FormControlLabel>
                                <Input className="my-1" size={"md"} variant="rounded">
                                    <InputField
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={passwordConfirmation}
                                        onChangeText={(text) => setPasswordConfirmation(text)}
                                    />
                                </Input>
                            </View>
                        )}
                    </FormControl>
                    <AuthButton text={screenText} onPress={() => onSubmit(email, password)} backgroundColor="bg-primaryGreen" variant="solid" action="primary" />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
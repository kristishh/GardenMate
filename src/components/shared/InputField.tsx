import { FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { Input, InputField as GluestackInputField } from "@/components/ui/input"
import { IInputProps } from "@gluestack-ui/input/lib/types"
import { ComponentProps, Dispatch, RefAttributes, SetStateAction } from "react"
import { TextInputProps, View } from "react-native"

type InputTypeField = {
    labelText: string
    isInvalid: boolean
    inputVariant?: ComponentProps<typeof Input>['variant']
    inputType: IInputProps["type"]
    inputValue: string
    onChangeText: Dispatch<SetStateAction<string>>
    className?: string | undefined
}

const InputField = ({className, labelText, isInvalid, inputVariant = 'rounded', inputType, inputValue, onChangeText}: InputTypeField) => {
    return (
        <View className={className}>
            <FormControlLabel>
                <FormControlLabelText>{labelText}</FormControlLabelText>
            </FormControlLabel>
            <Input isInvalid={isInvalid} className="my-1" size={"md"} variant={inputVariant}>
                <GluestackInputField
                    type={inputType}
                    value={inputValue}
                    onChangeText={onChangeText}
                />
            </Input>
        </View>
    )
}

export default InputField
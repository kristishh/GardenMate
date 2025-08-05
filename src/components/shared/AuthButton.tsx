import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";

type Props = {
    onPress: () => void,
    text: string,
    backgroundColor: string,
    variant: "solid" | undefined
    action: "primary" | "default"
    shadow?: string | undefined,
    isDisabled?: boolean
}

export default function AuthButton({ text, backgroundColor, shadow, variant, action, isDisabled = false, onPress }: Props) {
    return (
        <Button className={`${backgroundColor} ml-20 mr-20 mt-5 mb-5 ${shadow}`} size="lg" variant={variant} action={action} isDisabled={isDisabled} onPress={onPress}>
            {isDisabled ?
                <ButtonSpinner />
                : <ButtonText className="font-helvetica">{text}</ButtonText>}
        </Button>
    )
}
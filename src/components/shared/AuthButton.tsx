import { Button, ButtonText } from "@/components/ui/button";

type Props = {
    onPress: () => void,
    text: string,
    backgroundColor: string,
    variant: "solid" | undefined
    action: "primary" | "default"
}

export default function AuthButton({text, backgroundColor, variant, action, onPress}: Props) {
    return (
        <Button className={`${backgroundColor} ml-20 mr-20 mt-5 mb-5`} size="lg" variant={variant} action={action} onPress={onPress}>
            <ButtonText className="font-helvetica">{text}</ButtonText>
        </Button>
    )
}
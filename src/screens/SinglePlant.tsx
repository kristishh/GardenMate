import { Text, View } from "react-native"
import { SinglePlantProps } from "../navigation"

const SinglePlant = ({ route }: SinglePlantProps) => {
    const { id } = route.params

    return (
        <View>
            <Text>
                Signle PLant page {id}
            </Text>
        </View>
    )
}

export default SinglePlant
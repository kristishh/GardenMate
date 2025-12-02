import { Text, View } from "react-native"
import { SinglePlantProps } from "../navigation"
import { useEffect } from "react";

const SinglePlant = ({ route, navigation }: SinglePlantProps) => {
    const { id, title } = route.params

    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerBackTitle: 'Home',
            headerBackVisible: true
        })
    }, [navigation, id])

    return (
        <View>
            <Text>
                Signle PLant page {title}
            </Text>
        </View>
    )
}

export default SinglePlant
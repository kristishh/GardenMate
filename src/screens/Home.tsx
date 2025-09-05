import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Timestamp } from "firebase/firestore";
import ImageCarousel from "../components/addImages/ImageCarousel";
import usePlantsFacade from "../facades/usePlantsFacade";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
export interface Plant {
    id: string;
    name: string;
    species: string;
    notes: string;
    plantedOn: Timestamp;
    imageUrls: string[];
}

export default function Home() {
    const { loading, plantsWithImages, fetchPlantsWithImages } = usePlantsFacade()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    useEffect(() => {
        fetchPlantsWithImages();
    }, []);

    if (loading) return

    return (
        <View className="bg-tertiaryGreen">
            <ScrollView>
                {plantsWithImages.map((plant, index) => {
                    return (
                        <Pressable onPress={() => navigation.navigate('NestedStack', { screen: 'SinglePlant', params: { id: plant.id } })}>
                            <View key={plant.id} className="bg-primaryGreen m-5 gap-y-5 p-5 rounded-lg shadow-md">
                                {plant.imageUrls.length > 0 && <ImageCarousel images={plant.imageUrls} previewOnly={true} />}
                                <Text className="color-white">{plant.name}</Text>
                                {plant.notes && <Text className="color-white">{plant.notes}</Text>}
                                <Text className="color-white" >{plant.plantedOn.toDate().toDateString()}</Text>
                            </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}
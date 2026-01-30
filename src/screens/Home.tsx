import { useEffect, useState, useCallback } from "react";
import { Pressable, ScrollView, Text, View, Alert, TouchableOpacity } from "react-native";
import ImageCarousel from "../components/addImages/ImageCarousel";
import usePlantsFacade from "../facades/usePlantsFacade";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Home() {
    const { loading, plantsWithImages, fetchPlantsWithImages, deletePlants } = usePlantsFacade();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>([]);

    useEffect(() => {
        fetchPlantsWithImages();
    }, []);

    const toggleSelectionMode = useCallback(() => {
        if (isSelectionMode) {
            setSelectedPlantIds([]);
        }
        setIsSelectionMode(prev => !prev);
    }, [isSelectionMode]);

    const togglePlantSelection = useCallback((plantId: string) => {
        setSelectedPlantIds(prevIds => {
            if (prevIds.includes(plantId)) {
                return prevIds.filter(id => id !== plantId);
            } else {
                return [...prevIds, plantId];
            }
        });
    }, []);

    const handleBatchDelete = useCallback(() => {
        if (selectedPlantIds.length === 0) return;

        Alert.alert(
            "Delete Selected Plants",
            `Are you sure you want to delete ${selectedPlantIds.length} plant(s)? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        setIsSelectionMode(false);
                        setSelectedPlantIds([]);
                    },
                    style: "destructive"
                }
            ]
        );
    }, [selectedPlantIds, deletePlants]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={isSelectionMode ? handleBatchDelete : toggleSelectionMode}>
                    <Text className={`text-lg font-semibold ${isSelectionMode && selectedPlantIds.length > 0 ? 'text-red-500' : 'text-primaryGreen'}`}>
                        {isSelectionMode
                            ? (selectedPlantIds.length > 0 ? `Delete (${selectedPlantIds.length})` : 'Cancel')
                            : 'Select'}
                    </Text>
                </TouchableOpacity>
            ),
            headerLeft: () => isSelectionMode ? (
                <TouchableOpacity onPress={toggleSelectionMode}>
                    <Text className="text-lg text-gray-500">Done</Text>
                </TouchableOpacity>
            ) : null
        });
    }, [navigation, isSelectionMode, selectedPlantIds.length, handleBatchDelete, toggleSelectionMode]);

    if (loading) return null;

    return (
        <View className="bg-tertiaryGreen flex-1">
            <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                {plantsWithImages.map((plant) => {
                    const isSelected = selectedPlantIds.includes(plant.id);

                    const onPressHandler = isSelectionMode
                        ? () => togglePlantSelection(plant.id)
                        : () => navigation.navigate('NestedStack', { screen: 'SinglePlant', params: { id: plant.id, title: plant.name } });

                    return (
                        <Pressable
                            key={plant.id}
                            onPress={onPressHandler}
                            className={`mx-4 my-2 p-3 rounded-xl shadow-md ${isSelectionMode ? isSelected ? "bg-white border-2 border-red-500"
                                : "bg-white border border-gray-200"
                                : "bg-white shadow-lg"}`}
                        >
                            <View className="gap-y-3">
                                {plant.imageUrls.length > 0 &&
                                    <View className="overflow-hidden rounded-lg pb-2">
                                        <ImageCarousel images={plant.imageUrls} previewOnly={true} />
                                    </View>
                                }

                                <View className="pb-1">
                                    <Text className={`text-lg ${isSelectionMode && isSelected ? 'font-extrabold text-red-600' : 'text-primaryGreen font-semibold'}`}>{plant.name}</Text>

                                    {plant.notes &&
                                        <Text className={`text-sm ${isSelectionMode ? 'text-gray-600' : 'text-gray-700'} mt-1`} numberOfLines={2}>
                                            {plant.notes}
                                        </Text>
                                    }

                                    <View className="flex-row gap-2 mt-1">
                                        <FontAwesome className={`text-xs mt-1 ${isSelectionMode ? 'text-gray-500' : 'text-gray-400'}`} name="calendar" size={14} color="gray" />
                                        <Text className={`text-xs mt-1 ${isSelectionMode ? 'text-gray-500' : 'text-gray-400'}`}>{plant.plantedOn.toDate().toDateString()}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View >
    );
}
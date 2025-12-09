import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { FirestoreTimestamp, Plant } from '../../types/index';
import DetailRow from "./DetailRow";
import ImageCarousel from "../addImages/ImageCarousel";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import usePlantsFacade from "@/src/facades/usePlantsFacade";

interface PlantDetailDisplayProps {
    plant: Plant;
}

const formatFirestoreTimestamp = (timestamp: FirestoreTimestamp): string => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};


const PlantDetails = ({ plant }: PlantDetailDisplayProps) => {
    const { updatePlantNotes } = usePlantsFacade()
    const [localNotes, setLocalNotes] = useState(plant.notes);
    const [isSaving, setIsSaving] = useState(false);
    const formattedDate = formatFirestoreTimestamp(plant.plantedOn);

    useEffect(() => {
        if (localNotes === plant.notes) {
            setIsSaving(false);
            return;
        }

        setIsSaving(true);

        const handler = setTimeout(async () => {
            setIsSaving(true);
            await updatePlantNotes(plant.id, localNotes)
            setIsSaving(false);
        }, 2000);

        return () => {
            clearTimeout(handler);
        };

    }, [localNotes, plant.id]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }} // 🎯 Must be flex: 1 here
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            className="bg-[#F0F8F5]"
        >
            <ScrollView
                // 🎯 Ensure ScrollView takes up all available height too
                className="w-full h-full p-5"
                contentContainerStyle={{ paddingBottom: 50 }} // Added buffer for the last item
                keyboardShouldPersistTaps="handled"
            >

                <Box className="bg-white rounded-xl shadow-lg p-4">
                    <View className="mb-6">
                        <ImageCarousel
                            images={plant.imageUrls}
                            previewOnly={true}
                        />
                    </View>

                    <View className="p-2">
                        <Heading className="text-3xl font-bold mb-4 text-[#14905C]">
                            {plant.name}
                        </Heading>
                        <Divider className="bg-[#6F7B76] my-2" />

                        {plant.plantType && <DetailRow
                            label="Plant Type"
                            value={plant.plantType.charAt(0).toUpperCase() + plant.plantType.slice(1)}
                            iconName="leaf"
                        />}

                        <DetailRow
                            label="Planted On"
                            value={formattedDate}
                            iconName="calendar"
                        />

                        <View className="mt-4">
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="flex-row items-center">
                                    <FontAwesome name="sticky-note" size={18} color="#6F7B76" />
                                    <Text className="ml-3 text-xl font-semibold text-[#0A1511]">Notes</Text>
                                </View>
                                {isSaving && (
                                    <Text className="text-sm font-medium text-amber-600">
                                        {localNotes !== plant.notes ? 'Autosaving...' : 'Saved'}
                                    </Text>
                                )}
                            </View>
                            <Textarea className="min-h-[100px] border border-gray-300 rounded-lg">
                                <TextareaInput
                                    value={localNotes}
                                    onChangeText={setLocalNotes}
                                    placeholder="Add a note for your plant..."
                                    className="text-base text-[#6F7B76]"
                                />
                            </Textarea>
                        </View>
                    </View>
                </Box>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default PlantDetails;
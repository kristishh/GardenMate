import { ScrollView, Text, View } from "react-native";
import { shuffleArray } from "../utils/helpers";

type CategoryTips = {
  [key: string]: string[];
};

const tips: CategoryTips = {
    '💧 Watering': [
        "Water deeply and infrequently to encourage strong root growth.",
        "Water at the base of the plant to prevent fungal diseases on leaves.",
        "Water in the morning to minimize evaporation.",
    ],
    '🐛 Pest and Weed Control': [
        "Use a layer of mulch to suppress weeds and retain soil moisture.",
        "Hand-pull weeds regularly to prevent them from competing with your plants.",
        "Identify pests early and use natural remedies like insecticidal soap.",
    ],
    '✂️ Fertilizing and Pruning': [
        "Don't over-fertilize; too much can burn plants.",
        "Prune your plants to remove dead growth and promote new blooms.",
        "Use a slow-release, balanced fertilizer for healthy growth.",
    ],
    '🥕 General Tips': [
        "Know your hardiness zone to choose plants that can survive your climate.",
        "Match your plant's needs to your garden's conditions.",
        "Healthy soil is the foundation of a successful garden.",
    ],
};

export default function Tips() {
    const categories = Object.keys(tips)
    const shuffledCategories = shuffleArray([...categories]);

    return (
        <View className="bg-tertiaryGreen py-5 h-full">
            <ScrollView>
                <Text className="text-center text-lg font-bold ">Gardening Tips and Tricks</Text>
                {shuffledCategories.map((category) => (
                    <View className="bg-white m-5 gap-y-5 p-5 rounded-lg shadow-md" key={category}>
                        <Text className="text-center color-primaryGreen font-bold">{category}</Text>
                        {shuffleArray([...tips[category]]).map((tip, index) => (
                            <Text key={tip}>- {tip}</Text>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
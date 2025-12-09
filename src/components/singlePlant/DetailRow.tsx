import { Text, View } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DetailRow = ({ label, value, iconName }: { label: string; value: string; iconName: string }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
        <View className="flex-row items-center">
            <FontAwesome name={iconName} size={18} color="#6F7B76" />
            <Text className="ml-3 text-lg font-semibold text-[#0A1511]">{label}</Text>
        </View>
        <Text className="text-lg text-right text-[#6F7B76] max-w-[60%]">{value}</Text>
    </View>
);

export default DetailRow
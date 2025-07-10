import { useState } from "react";
import { Alert, View } from "react-native";
import ImageCarousel from "../components/addImages/ImageCarousel";
import { ImagePickerAsset } from "expo-image-picker";

export default function AddPlantScreen() {
    const [images, setImages] = useState<ImagePickerAsset[] | []>([]);
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState(new Date())
    
    const handleSave = () => {
        if (!name || !type) {
            Alert.alert("Please fill all fields!")
        }

        setName('')
        setType('')
        setDate(new Date())
    }

    return (
        <View className="h-full p-5 bg-tertiaryGreen">
            <ImageCarousel images={images} updateImages={setImages}/>
        </View>
    )
}
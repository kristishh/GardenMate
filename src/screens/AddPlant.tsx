import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerAsset } from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormControl } from "@/components/ui/form-control";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { firebaseDB } from "@/firebaseConfig";
import ImageCarousel from "../components/addImages/ImageCarousel";
import InputField from "../components/shared/InputField";
import AuthButton from "../components/shared/AuthButton";
import { RootStackParamList } from "../navigation";
import { uploadImage } from "../services";
import Dropdown from "../components/shared/Dropdown";
import usePlantTypesFacade from "../facades/usePlantTypesFacade";
import { PlantTypes } from "../types/index";

export default function AddPlant() {
    const { loading, plantTypes, fetchPlantTypes } = usePlantTypesFacade()
    const [images, setImages] = useState<ImagePickerAsset[] | []>([]);
    const [name, setName] = useState<string>('')
    const [type, setType] = useState<PlantTypes["name"] | null>(null)
    const [date, setDate] = useState<Date>(new Date())
    const [description, setDescription] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handleSave = async () => {
        if (!name) {
            return Alert.alert("Please fill all fields!")
        }
        const plantsCollectionRef = collection(firebaseDB, "plants")

        try {
            setIsLoading(true)
            const newPlantDocRef = await addDoc(plantsCollectionRef, {
                name: name,
                plantType: type,
                notes: description,
                plantedOn: date
            });
            const plantId = newPlantDocRef.id
            const imagesCollectionRef = collection(firebaseDB, "images"); 

            for (const asset of images) {
                const downloadURL = await uploadImage(asset)
                
                 await addDoc(imagesCollectionRef, {
                    imageUrl: downloadURL,
                    plantRef: plantId,
                    uploadedAt: serverTimestamp(),
                });
            }
            setName('')
            setType(null)
            setImages([])
            setDescription('')
            setDate(new Date())
            setIsLoading(false)
            navigation.navigate('HomeTabs')
        } catch (error) {
            console.log(error);
            
            Alert.alert("Something went wrong")
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPlantTypes()
    }, [])

    if(loading) return null

    return (
        <View className="h-full bg-tertiaryGreen">
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                keyboardDismissMode="interactive"
                contentContainerClassName="flexGrow justify-between p-10"
                keyboardShouldPersistTaps="handled"
            >
                <FormControl
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={false}
                    className="gap-y-5"
                >
                    <ImageCarousel images={images} updateImages={setImages} />
                    <InputField
                        className="bg-white p-5 rounded-lg shadow-md"
                        labelText="Plant name"
                        isInvalid={false}
                        inputType="text"
                        inputValue={name}
                        inputVariant="underlined"
                        onChangeText={(text) => setName(text)}
                    />
                    <Dropdown onSelect={setType} options={plantTypes} variant={"rounded"} size={"lg"}/>
                    <View className="flex-row items-center shadow-md bg-white p-5 rounded-lg">
                        <Text className="text-lg">Planted on</Text>
                        <RNDateTimePicker className="color-primaryGreen" value={date} onChange={(e, date) => setDate(date as Date)} />
                    </View>
                    <View className="bg-white p-5 rounded-lg shadow-md">
                        <Text className="text-lg">Notes</Text>
                        <Textarea>
                            <TextareaInput value={description} onChangeText={setDescription} placeholder="Add a note for your plant..." />
                        </Textarea>
                    </View>
                </FormControl>
                <AuthButton text={"Add Plant"} onPress={handleSave} isDisabled={isLoading} backgroundColor="bg-primaryGreen" shadow="shadow-md" variant="solid" action="primary" />
            </ScrollView>
        </View>
    )
}
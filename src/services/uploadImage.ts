import { firebaseStorage } from "@/firebaseConfig";
import { ImagePickerAsset } from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (image: ImagePickerAsset): Promise<string> => {
    if (!image.uri) {
        throw new Error("Image asset URI is missing.");
    }

    try {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const storageRef = ref(firebaseStorage, `images/${image.uri}`);
        const snapshot = await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(snapshot.ref);
        return url

    } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
        throw error;
    }
};
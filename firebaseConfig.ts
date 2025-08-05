// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ImagePickerAsset } from "expo-image-picker";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyC6nsxFJ7AsRbQ0eOnVnkqk3pnG5F8YUgk",
  authDomain: "gardenmate-3c6e8.firebaseapp.com",
  projectId: "gardenmate-3c6e8",
  storageBucket: "gardenmate-3c6e8.firebasestorage.app",
  messagingSenderId: "271506490838",
  appId: "1:271506490838:web:2b36f2146be5dc82655077",
  measurementId: "G-13NWS0G658"
};

// Initialize Firebase Authentication and get a reference to the service
export const firebaseApp = initializeApp(firebaseConfig)
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const firebaseDB = getFirestore()
export const firebaseStorage = getStorage(firebaseApp);

export const uploadImageToFirebaseStorage = async (image: ImagePickerAsset): Promise<string> => {
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
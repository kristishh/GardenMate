import { firebaseDB } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { PlantTypes } from "../types/index";

export const fetchPlantTypes = async (): Promise<PlantTypes[]> => {
    try {
        const categoriesCollectionRef = collection(firebaseDB, "plant_types");
        const snapshot = await getDocs(categoriesCollectionRef);

        const types: PlantTypes[] = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }));

        return types;

    } catch (error) {
        console.error("Error fetching plant types:", error);

        throw new Error("Failed to retrieve plant categories from the database.");
    }
};
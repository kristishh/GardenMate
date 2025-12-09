import { firebaseDB } from "@/firebaseConfig";
import { collection, DocumentData, doc, getDocs, query, QuerySnapshot, where, orderBy, updateDoc } from "firebase/firestore";
import { Plant, PlantImage } from "../types/index";

export const updatePlantNotes = async (plantId: string, newNotes: string): Promise<void> => {
    const plantRef = doc(firebaseDB, "plants", plantId);
    return await updateDoc(plantRef, {
        notes: newNotes,
    });
};


export const fetchPlantsWithImages = async (): Promise<Plant[]> => {
    try {
        const plantsCollectionRef = collection(firebaseDB, 'plants');
        const plantsQuery = query(plantsCollectionRef, orderBy('plantedOn', 'desc'))
        const plantsSnapshot: QuerySnapshot<DocumentData> = await getDocs(plantsQuery);
        const plants: Plant[] = [];
        const imagePromises: Promise<void>[] = [];
        
        for (const plantDoc of plantsSnapshot.docs) {
            const plantData = plantDoc.data();
            const plantId = plantDoc.id;
            const plant: Plant = {
                id: plantId,
                ...plantData,
                imageUrls: []
            } as unknown as Plant;

            plants.push(plant);
            
            const plantImagesPromise = (async () => {
                const plantRef = doc(firebaseDB, 'plants', plantId); 
                const imagesCollectionRef = collection(firebaseDB, 'images');
                const imagesQuery = query(imagesCollectionRef, where('plantRef', '==', plantRef.id));
                const imagesSnapshot = await getDocs(imagesQuery);
                const imageUrls: string[] = [];

                imagesSnapshot.forEach(imageDoc => {
                    const imageData = imageDoc.data() as PlantImage;

                    imageUrls.push(imageData.imageUrl);
                });
                
                plant.imageUrls = imageUrls;
            })();

            imagePromises.push(plantImagesPromise);
        }
        
        await Promise.all(imagePromises);
        
        return plants;
    } catch (error) {
        console.error("Error fetching plants with images: ", error);
        throw error;
    }
};
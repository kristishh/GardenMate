import { firebaseDB, firebaseStorage } from "@/firebaseConfig";
import { collection, DocumentData, doc, getDocs, query, QuerySnapshot, where, orderBy, updateDoc, deleteDoc } from "firebase/firestore";
import { Plant, PlantImage } from "../types/index";
import { deleteObject, ref } from "firebase/storage";
import { getStoragePathFromUrl } from "../utils/helpers";

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

export const deletePlants = async (plants: Plant[]): Promise<void> => {
    if (plants.length === 0) return;

    const deletePromises: Promise<any>[] = [];

    plants.forEach(plant => {
        // 1. Storage Deletion Promises
        plant.imageUrls.forEach(url => {
            const storagePath = getStoragePathFromUrl(url);
            
            if (storagePath) {
                const storageRef = ref(firebaseStorage, storagePath); 
                
                deletePromises.push(deleteObject(storageRef).catch(e => {
                    console.warn(`Could not delete image at path ${storagePath}. Error: ${e.message}`);
                }));
            } else {
                console.warn(`Skipping image deletion for invalid or unparseable URL: ${url}`);
            }
        });

        const plantRef = doc(firebaseDB, 'plants', plant.id);
        deletePromises.push(deleteDoc(plantRef));
    });

    try {
        await Promise.all(deletePromises);
        console.log('Batch deletion of documents and images successful.');
    } catch (error) {
        console.error('Error during batch deletion:', error);
        throw new Error("Failed to delete one or more documents or images.");
    }
};
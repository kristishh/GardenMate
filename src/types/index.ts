import { DocumentReference, Timestamp } from "firebase/firestore";

export interface Plant {
    id: string;
    name: string;
    species: string;
    notes: string;
    plantedOn: Timestamp;
    imageUrls: string[]; 
}

export interface PlantImage {
    id: string;
    imageUrl: string;
    plantRef: DocumentReference;
    uploadedAt: Timestamp;
}

export interface PlantTypes {
    id: string;
    name: string;
}
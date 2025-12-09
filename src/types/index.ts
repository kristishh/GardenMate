import { DocumentReference, Timestamp } from "firebase/firestore";

export interface Plant {
    id: string;
    name: string;
    plantType: string;
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

export interface FirestoreTimestamp {
    nanoseconds: number;
    seconds: number;
}
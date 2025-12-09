import { create } from "zustand"
import { fetchPlantsWithImages, updatePlantNotes } from "../services";
import { Plant } from "../types/index";

interface PlantState {
    plantsWithImages: Plant[];
    loading: boolean;
    error: string | null;
    fetchPlantsWithImages: () => Promise<void>;
    updatePlantNotes: (plantId: string, newNotes: string) => Promise<void>;
}

const initialState = {
    plantsWithImages: [],
    loading: false,
    error: "",
}
const usePlantsStore = create<PlantState>((set) => ({
    plantsWithImages: initialState.plantsWithImages,
    loading: initialState.loading,
    error: initialState.error,

    updatePlantNotes: async (plantId, newNotes) => {
        try {
            await updatePlantNotes(plantId, newNotes.trim())

            set((state) => ({   
                ...state,
                plantsWithImages: state.plantsWithImages.map(plant =>
                    plant.id === plantId
                        ? { ...plant, notes: newNotes }
                        : plant
                ),
            }))
        } catch (error: unknown) {
            const errorMessage = (error as Error).message
            set({
                error: errorMessage,
            });
        } finally {
            set((state) => ({
                ...state,
                loading: false,
            }))
        }
    },

    fetchPlantsWithImages: async () => {
        set((state) => ({ ...state, loading: true }))
        try {
            const plantsWithImages = await fetchPlantsWithImages()
            set((state) => ({ ...state, error: "", plantsWithImages: plantsWithImages }))
        } catch (error: unknown) {
            const errorMessage = (error as Error).message
            set({
                error: errorMessage,
            });
        } finally {
            set((state) => ({
                ...state,
                loading: false,
            }))
        }
    },
}))

export default usePlantsStore

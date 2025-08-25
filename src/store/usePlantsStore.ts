import { create } from "zustand"
import { fetchPlantsWithImages } from "../services";
import { Plant } from "../types/index";

interface PlantState {
    plantsWithImages: Plant[];
    loading: boolean;
    error: string | null;
    fetchPlantsWithImages: () => Promise<void>;
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

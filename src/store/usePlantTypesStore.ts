import { create } from "zustand"
import { PlantTypes } from "../types/index";
import { fetchPlantTypes } from "../services";

interface PlantTypesState {
    plantTypes: PlantTypes[];
    loading: boolean;
    error: string | null;
    fetchPlantTypes: () => Promise<void>;
}

const initialState = {
    plantTypes: [],
    loading: false,
    error: "",
}
const usePlantTypesStore = create<PlantTypesState>((set) => ({
    plantTypes: initialState.plantTypes,
    loading: initialState.loading,
    error: initialState.error,

    fetchPlantTypes: async () => {
        set((state) => ({ ...state, loading: true }))
        try {
            const plantTypes = await fetchPlantTypes()
            set((state) => ({ ...state, error: "", plantTypes: plantTypes }))
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

export default usePlantTypesStore

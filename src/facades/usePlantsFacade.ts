
import { useShallow } from "zustand/shallow"
import usePlantsStore from "../store/usePlantsStore"

const usePlantsFacade = () => {
    const { plantsWithImages, loading, error, fetchPlantsWithImages, updatePlantNotes } = usePlantsStore(useShallow((
        (state) => ({
            plantsWithImages: state.plantsWithImages,
            loading: state.loading,
            error: state.error,
            fetchPlantsWithImages: state.fetchPlantsWithImages,
            updatePlantNotes: state.updatePlantNotes
        })))
    )

    return { plantsWithImages, loading, error, fetchPlantsWithImages, updatePlantNotes }
}

export default usePlantsFacade
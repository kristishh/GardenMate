
import { useShallow } from "zustand/shallow"
import usePlantsStore from "../store/usePlantsStore"

const usePlantsFacade = () => {
    const { plantsWithImages, loading, error, fetchPlantsWithImages } = usePlantsStore(useShallow((
        (state) => ({
            plantsWithImages: state.plantsWithImages,
            loading: state.loading,
            error: state.error,
            fetchPlantsWithImages: state.fetchPlantsWithImages,
        })))
    )

    return { plantsWithImages, loading, error, fetchPlantsWithImages }
}

export default usePlantsFacade